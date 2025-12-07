/**
 * Card Component
 * 
 * Converted from snippets/ds-card.liquid
 * Basic card container with variants and hover effects
 */

import React from 'react'

export interface CardProps {
  /** Card content */
  children: React.ReactNode
  /** Card variant: 'default' | 'minimal' | 'featured' */
  variant?: 'default' | 'minimal' | 'featured'
  /** Enable hover lift and glow effects */
  hover?: boolean
  /** Additional CSS classes */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  children,
  variant = 'default',
  hover = false,
  className = '',
  style,
}, ref) => {
  const classes = [
    'ds-card',
    variant === 'minimal' ? 'ds-minimal-card' : '',
    variant === 'featured' ? 'is-featured' : '',
    hover ? 'ds-card--hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={classes} style={style}>
      {children}
    </div>
  )
})

Card.displayName = 'Card'



















