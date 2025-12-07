/**
 * Spinner Component
 * 
 * Converted from snippets/ds-spinner.liquid
 * Loading spinner with SVG animation
 */

import React from 'react'

export interface SpinnerProps {
  /** Spinner size */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Spinner color */
  color?: 'primary' | 'secondary' | 'white' | 'custom'
  /** Custom color value (if color is 'custom') */
  customColor?: string
  /** Loading label text */
  label?: string
  /** Display inline with content */
  inline?: boolean
  /** Additional CSS classes */
  className?: string
}

export default function Spinner({
  size = 'md',
  color = 'primary',
  customColor,
  label,
  inline = false,
  className = '',
}: SpinnerProps) {
  const classes = [
    'ds-spinner-wrapper',
    inline ? 'ds-spinner-inline' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const spinnerStyle: React.CSSProperties = {}
  if (color === 'custom' && customColor) {
    spinnerStyle.stroke = customColor
  }

  return (
    <div
      className={classes}
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <svg
        className={`ds-spinner ds-spinner-${size} ds-spinner-${color}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={spinnerStyle}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeDasharray="31.416"
          strokeDashoffset="31.416"
        />
      </svg>
      {label ? (
        <span className="ds-spinner-label">{label}</span>
      ) : (
        <span className="visually-hidden">Loading content</span>
      )}
    </div>
  )
}

















