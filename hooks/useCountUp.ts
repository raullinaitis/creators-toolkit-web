/**
 * useCountUp Hook
 * 
 * Animates a number from 0 to its target value over a specified duration.
 * Handles string parsing for formatted numbers (e.g., "11.1M", "7.79%", "586K").
 * Uses IntersectionObserver to start animation only when element is in view.
 */

import { useState, useEffect, useRef } from 'react'

interface UseCountUpOptions {
  /** Duration of animation in milliseconds */
  duration?: number
  /** Delay before starting animation in milliseconds */
  delay?: number
  /** Easing function */
  easing?: (t: number) => number
  /** Threshold for IntersectionObserver (0-1) */
  threshold?: number
  /** Whether to animate automatically on mount (ignores IntersectionObserver if true) */
  startOnMount?: boolean
}

/**
 * Parses a formatted number string (e.g., "11.1M", "7.79%", "586K")
 */
function parseFormattedNumber(value: string): {
  numericValue: number
  suffix: string
  decimalPlaces: number
} {
  const cleaned = value.trim()
  const suffixMatch = cleaned.match(/[A-Z%]+$/i)
  const suffix = suffixMatch ? suffixMatch[0] : ''
  const numericPart = cleaned.replace(/[^0-9.]/g, '')
  const numericValue = parseFloat(numericPart) || 0
  const decimalMatch = numericPart.match(/\.(\d+)/)
  const decimalPlaces = decimalMatch ? decimalMatch[1].length : 0
  
  return { numericValue, suffix, decimalPlaces }
}

/**
 * Formats a number with its suffix and decimal places
 */
function formatNumber(value: number, suffix: string, decimalPlaces: number): string {
  const formatted = decimalPlaces > 0 
    ? value.toFixed(decimalPlaces)
    : Math.round(value).toString()
  
  return suffix ? `${formatted}${suffix}` : formatted
}

const defaultEasing = (t: number): number => {
  return 1 - Math.pow(1 - t, 2.5)
}

export function useCountUp<T extends HTMLElement = HTMLDivElement>(
  targetValue: string | number,
  options: UseCountUpOptions = {}
) {
  const {
    duration = 2000,
    delay = 0,
    easing = defaultEasing,
    threshold = 0.1,
    startOnMount = false,
  } = options

  const [displayValue, setDisplayValue] = useState<string>('0')
  const elementRef = useRef<T | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const hasStartedRef = useRef<boolean>(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Reset animation state when target value changes
    hasStartedRef.current = false
    startTimeRef.current = null
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    // Parse target value
    const targetStr = typeof targetValue === 'number' 
      ? targetValue.toString() 
      : targetValue
    
    const { numericValue, suffix, decimalPlaces } = parseFormattedNumber(targetStr)

    // Immediate zero check
    if (numericValue === 0) {
      setDisplayValue(formatNumber(0, suffix, decimalPlaces))
      return
    }

    const startAnimation = () => {
      if (hasStartedRef.current) return
      hasStartedRef.current = true
      startTimeRef.current = null

      // Initial delay
      const runAnimation = () => {
        const animate = (currentTime: number) => {
          if (startTimeRef.current === null) {
            startTimeRef.current = currentTime
          }

          const elapsed = currentTime - startTimeRef.current
          const progress = Math.min(elapsed / duration, 1)
          const easedProgress = easing(progress)
          const currentValue = numericValue * easedProgress

          setDisplayValue(formatNumber(currentValue, suffix, decimalPlaces))

          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(animate)
          } else {
            setDisplayValue(formatNumber(numericValue, suffix, decimalPlaces))
            animationFrameRef.current = null
          }
        }
        animationFrameRef.current = requestAnimationFrame(animate)
      }

      if (delay > 0) {
        setTimeout(runAnimation, delay)
      } else {
        runAnimation()
      }
    }

    // Observer setup - wait for ref to be attached
    if (!startOnMount && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      // Clean up previous observer
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }

      // Use a small timeout to ensure ref is attached
      let timeoutId: NodeJS.Timeout | null = null
      let retryTimeoutId: NodeJS.Timeout | null = null
      
      const setupObserver = () => {
        if (!elementRef.current) {
          retryTimeoutId = setTimeout(setupObserver, 10)
          return
        }

        // Check if element is already visible
        const rect = elementRef.current.getBoundingClientRect()
        const isAlreadyVisible = rect.top < window.innerHeight && rect.bottom > 0

        if (isAlreadyVisible && !hasStartedRef.current) {
          startAnimation()
          return
        }

        observerRef.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && !hasStartedRef.current) {
              startAnimation()
              if (observerRef.current) {
                observerRef.current.disconnect()
                observerRef.current = null
              }
              if (timeoutId) {
                clearTimeout(timeoutId)
                timeoutId = null
              }
            }
          },
          { threshold, rootMargin: '50px' }
        )

        if (elementRef.current) {
          observerRef.current.observe(elementRef.current)
        }

        // Fallback: start animation after 3 seconds if observer hasn't fired
        timeoutId = setTimeout(() => {
          if (!hasStartedRef.current && elementRef.current) {
            startAnimation()
            if (observerRef.current) {
              observerRef.current.disconnect()
              observerRef.current = null
            }
          }
        }, 3000)
      }

      setupObserver()

      return () => {
        if (retryTimeoutId) clearTimeout(retryTimeoutId)
        if (timeoutId) clearTimeout(timeoutId)
        if (observerRef.current) {
          observerRef.current.disconnect()
          observerRef.current = null
        }
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect()
          observerRef.current = null
        }
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }
      }
    } else {
      // Fallback: start immediately
      startAnimation()
      return () => {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }
      }
    }
  }, [targetValue, duration, delay, easing, threshold, startOnMount])

  return { value: displayValue, ref: elementRef }
}
