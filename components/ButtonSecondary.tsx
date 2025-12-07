/**
 * ButtonSecondary Component
 * 
 * Converted from snippets/ds-btn-secondary.liquid
 * Secondary button with frosted glass background, icon support, and size variants
 */

import React from 'react'
import Link from 'next/link'

export interface ButtonSecondaryProps {
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

export function ButtonSecondary({
  text,
  url,
  size = 'md',
  iconSvg,
  className = '',
  id,
  type = 'button',
  onClick,
}: ButtonSecondaryProps) {
  const sizeClass = `btn-${size}`
  const classes = `ds-btn-secondary-wrapper ${sizeClass}${className ? ` ${className}` : ''}`

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

