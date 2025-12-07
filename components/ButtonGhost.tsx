/**
 * ButtonGhost Component
 * 
 * Ghost button with frosted glass background, no border, icon support, and size variants
 * Minimal styling - just hover effect and text
 */

import React from 'react'
import Link from 'next/link'

export interface ButtonGhostProps {
  /** Button text content (required) */
  text: string
  /** Link destination (if provided, renders as <a>, otherwise <button>) */
  url?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Inline SVG code for icon (placed before text) */
  iconSvg?: React.ReactNode | string
  /** Additional CSS classes */
  className?: string
  /** Element ID */
  id?: string
  /** Button type for <button> elements */
  type?: 'button' | 'submit' | 'reset'
  /** Click handler for button elements */
  onClick?: () => void
}

export function ButtonGhost({
  text,
  url,
  size = 'md',
  iconSvg,
  className = '',
  id,
  type = 'button',
  onClick,
}: ButtonGhostProps) {
  const sizeClass = `btn-${size}`
  const classes = `ds-btn-ghost-wrapper ${sizeClass}${className ? ` ${className}` : ''}`

  // If icon is a string (SVG markup), render it dangerously
  // Otherwise, render as React node
  const iconElement = iconSvg ? (
    typeof iconSvg === 'string' ? (
      <span className="icon" dangerouslySetInnerHTML={{ __html: iconSvg }} />
    ) : (
      <span className="icon">{iconSvg}</span>
    )
  ) : null

  // Determine aria-label if needed
  const ariaLabel = !text && iconSvg ? 'Button' : undefined

  // Render as link if URL provided, otherwise button
  if (url) {
    return (
      <Link href={url} className={classes} id={id} aria-label={ariaLabel}>
        {iconElement}
        {text}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      id={id}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {iconElement}
      {text}
    </button>
  )
}


