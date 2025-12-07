/**
 * CardSimple Component
 * 
 * Minimalistic card for less important content
 * Simple, clean design with minimal styling
 */

import React from 'react'

export interface CardSimpleProps {
  /** Card content */
  children: React.ReactNode
  /** Title for the card (optional) */
  title?: string
  /** Enable hover lift and glow effects */
  hover?: boolean
  /** Additional CSS classes */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

export function CardSimple({
  children,
  title,
  hover = true,
  className = '',
  style,
}: CardSimpleProps) {
  const classes = [
    'ds-card-simple',
    hover ? 'ds-card--hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} style={style}>
      {title && <h3 className="card-simple-title">{title}</h3>}
      <div className="card-simple-content">{children}</div>
    </div>
  )
}


