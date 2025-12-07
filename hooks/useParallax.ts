/**
 * useParallax Hook
 * 
 * Creates a parallax effect by tracking scroll position and returning
 * multiple dynamic values for movement, rotation, and scaling.
 */

'use client'

import { useEffect, useState } from 'react'

interface UseParallaxOptions {
  /** Speed multiplier (0.5 = moves at 50% of scroll speed, 0.3 = 30%, etc.) */
  speed?: number
  /** Whether to enable the parallax effect */
  enabled?: boolean
}

interface ParallaxValues {
  /** Vertical offset in pixels */
  offsetY: number
  /** Horizontal offset in pixels */
  offsetX: number
  /** Rotation angle in degrees */
  rotation: number
  /** Scale multiplier */
  scale: number
}

/**
 * useParallax Hook
 * 
 * @param options - Parallax options
 * @returns Object with parallax values (offsetY, offsetX, rotation, scale)
 */
export function useParallax(options: UseParallaxOptions = {}): ParallaxValues {
  const { speed = 0.5, enabled = true } = options
  const [values, setValues] = useState<ParallaxValues>({
    offsetY: 0,
    offsetX: 0,
    rotation: 0,
    scale: 1,
  })

  useEffect(() => {
    if (!enabled) {
      setValues({ offsetY: 0, offsetX: 0, rotation: 0, scale: 1 })
      return
    }

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      )
      const scrollProgress = scrollY / maxScroll

      // Vertical movement (original parallax)
      const offsetY = scrollY * speed

      // Horizontal movement (sinusoidal for smooth back-and-forth)
      const offsetX = Math.sin(scrollProgress * Math.PI * 2) * 50 * speed

      // Rotation (gradual rotation as you scroll)
      const rotation = scrollProgress * 15 * speed // Max 15 degrees rotation

      // Scale (subtle pulsing effect)
      const scale = 1 + Math.sin(scrollProgress * Math.PI * 4) * 0.1 * speed

      setValues({ offsetY, offsetX, rotation, scale })
    }

    // Initial calculation
    handleScroll()

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed, enabled])

  return values
}

