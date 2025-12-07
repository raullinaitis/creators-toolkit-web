/**
 * useScrollAnimation Hook
 * 
 * Triggers CSS animation when element enters viewport using IntersectionObserver
 * Adds 'is-visible' class when element is intersecting
 */

'use client'

import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  /** Threshold for IntersectionObserver (0-1) */
  threshold?: number
  /** Root margin for IntersectionObserver */
  rootMargin?: string
  /** Whether to trigger animation immediately if already visible */
  triggerOnce?: boolean
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    if (!ref.current) return

    // Check if element is already visible
    const rect = ref.current.getBoundingClientRect()
    const isAlreadyVisible = rect.top < window.innerHeight && rect.bottom > 0

    if (isAlreadyVisible) {
      setIsVisible(true)
      if (triggerOnce) return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce && observer) {
            observer.disconnect()
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce])

  return { isVisible, ref }
}



