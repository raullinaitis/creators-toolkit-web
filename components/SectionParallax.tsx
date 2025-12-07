/**
 * SectionParallax Component
 * 
 * Wraps sections to add parallax effects:
 * - Grid background moves relative to section center
 * - Content has subtle floating effect
 */

'use client'

import React, { useRef } from 'react'
import { useSectionParallax } from '@/hooks/useSectionParallax'

interface SectionParallaxProps {
  children: React.ReactNode
  className?: string
  gridSpeed?: number
  id?: string
}

export default function SectionParallax({
  children,
  className = '',
  gridSpeed = 0.5,
  id,
}: SectionParallaxProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { gridOffsetY } = useSectionParallax(sectionRef, {
    gridSpeed,
    contentSpeed: 0,
  })

  return (
    <section
      ref={sectionRef}
      id={id}
      className={className}
      style={
        {
          '--section-grid-offset-y': `${gridOffsetY}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </section>
  )
}

