/**
 * ParallaxBackground Component
 * 
 * Applies dynamic parallax effects to the body background gradients:
 * - Vertical and horizontal movement
 * - Rotation
 * - Scale changes
 */

'use client'

import { useParallax } from '@/hooks/useParallax'
import { useEffect } from 'react'

interface ParallaxBackgroundProps {
  /** Speed multiplier (0.3 = moves at 30% of scroll speed) */
  speed?: number
  /** Whether to enable parallax */
  enabled?: boolean
}

export default function ParallaxBackground({
  speed = 0.3,
  enabled = true,
}: ParallaxBackgroundProps) {
  const { offsetY, offsetX, rotation, scale } = useParallax({ speed, enabled })

  useEffect(() => {
    if (!enabled) {
      document.documentElement.style.setProperty('--parallax-offset-y', '0px')
      document.documentElement.style.setProperty('--parallax-offset-x', '0px')
      document.documentElement.style.setProperty('--parallax-rotation', '0deg')
      document.documentElement.style.setProperty('--parallax-scale', '1')
      return
    }

    // Apply parallax values to CSS custom properties
    document.documentElement.style.setProperty(
      '--parallax-offset-y',
      `${offsetY}px`
    )
    document.documentElement.style.setProperty(
      '--parallax-offset-x',
      `${offsetX}px`
    )
    document.documentElement.style.setProperty(
      '--parallax-rotation',
      `${rotation}deg`
    )
    document.documentElement.style.setProperty(
      '--parallax-scale',
      `${scale}`
    )
  }, [offsetY, offsetX, rotation, scale, enabled])

  return null
}

