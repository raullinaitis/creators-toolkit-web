/**
 * useSectionParallax Hook
 * 
 * Creates parallax effect relative to a specific section element
 * Grid moves slower than content, creating floating effect
 */

'use client'

import { useEffect, useState, RefObject } from 'react'

interface UseSectionParallaxOptions {
  /** Speed multiplier for grid background (0.5 = moves at 50% of scroll speed) */
  gridSpeed?: number
  /** Speed multiplier for content (deprecated, kept for compatibility) */
  contentSpeed?: number
  /** Whether to enable the parallax effect */
  enabled?: boolean
}

interface SectionParallaxValues {
  /** Grid background offset relative to section center */
  gridOffsetY: number
}

export function useSectionParallax(
  ref: RefObject<HTMLElement>,
  options: UseSectionParallaxOptions = {}
): SectionParallaxValues {
  const { gridSpeed = 0.5, enabled = true } = options
  const [values, setValues] = useState<SectionParallaxValues>({
    gridOffsetY: 0,
  })

  useEffect(() => {
    if (!enabled || !ref.current) {
      setValues({ gridOffsetY: 0 })
      return
    }

    const handleScroll = () => {
      const element = ref.current
      if (!element) return

      // Track scroll position - grid moves at half speed (0.5) relative to scroll
      const scrollY = window.scrollY || window.pageYOffset
      
      // Grid moves at specified speed (0.5 = half speed) of elements
      // Elements scroll at 100% speed, grid scrolls at gridSpeed% speed
      // Negate for CSS background-position (positive scroll = negative background offset)
      const gridOffsetY = -scrollY * gridSpeed

      setValues({ gridOffsetY })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [gridSpeed, enabled, ref])

  return values
}

