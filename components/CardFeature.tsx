/**
 * CardFeature Component
 * 
 * Converted from snippets/ds-card-feature.liquid
 * Feature card with icon, title, and description
 */

'use client'

import React, { useEffect, useRef, useId } from 'react'

export interface CardFeatureProps {
  /** Inline SVG code for feature icon */
  iconSvg: React.ReactNode
  /** Feature title */
  title: string
  /** Feature description */
  text: string
  /** Enable hover lift and glow effects */
  hover?: boolean
  /** Additional CSS classes */
  className?: string
}

export function CardFeature({
  iconSvg,
  title,
  text,
  hover = true,
  className = '',
}: CardFeatureProps) {
  const classes = [
    'ds-card-feature',
    hover ? 'ds-card--hover' : '',
    className
  ].filter(Boolean).join(' ')
  const iconContainerRef = useRef<HTMLDivElement>(null)
  
  // Unique gradient ID for this component instance (stable across server/client)
  const gradientId = `icon-gradient-${useId()}`

  useEffect(() => {
    // Apply gradient fill/stroke to SVG elements inside icon-container (matching social links pattern)
    if (iconContainerRef.current) {
      const svg = iconContainerRef.current.querySelector('svg')
      if (svg) {
        // Apply gradient to SVG fill attribute (acts as default for paths)
        const svgFill = svg.getAttribute('fill')
        if (!svgFill || svgFill === 'currentColor' || svgFill === 'none') {
          svg.setAttribute('fill', `url(#${gradientId})`)
        }
        
        // Apply gradient to all path elements inside the SVG
        const paths = svg.querySelectorAll('path')
        paths.forEach((path) => {
          const pathFill = path.getAttribute('fill')
          const pathStroke = path.getAttribute('stroke')
          
          // Check if path uses stroke (outlined icons)
          if (pathStroke && pathStroke !== 'none' && pathStroke !== 'currentColor') {
            // For outlined icons, apply gradient to stroke
            path.setAttribute('stroke', `url(#${gradientId})`)
            // Ensure fill is none for outlined icons
            if (!pathFill || pathFill === 'currentColor') {
              path.setAttribute('fill', 'none')
            }
          } else {
            // For filled icons, apply gradient to fill
            if (!pathFill || pathFill === 'currentColor' || pathFill === 'none') {
              path.setAttribute('fill', `url(#${gradientId})`)
            }
          }
        })
      }
    }
  }, [gradientId, iconSvg])

  return (
    <div className={classes}>
      {/* Gradient definition - rendered once per component instance */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--master-accent-primary)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'var(--master-accent-secondary)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      <div className="icon-container" ref={iconContainerRef}>
        {iconSvg}
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}
















