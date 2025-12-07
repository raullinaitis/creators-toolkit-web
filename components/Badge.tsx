/**
 * Badge Component
 * 
 * Reusable badge component with multiple style variants
 * Based on the raullinaitis media kit badge design
 */

import React from 'react'

export interface BadgeProps {
  /** Badge text content */
  text: string
  /** Badge variant style */
  variant?: 'main' | 'attention' | 'secondary'
  /** Badge size */
  size?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
}

export function Badge({
  text,
  variant = 'main',
  size = 'md',
  className = '',
}: BadgeProps) {
  return (
    <span className={`ds-badge ds-badge-${variant} ds-badge-${size} ${className}`}>
      {text}
    </span>
  )
}

