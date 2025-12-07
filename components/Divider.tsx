/**
 * Divider Component
 * 
 * Converted from snippets/ds-divider.liquid
 * Reusable divider component for visual separation with optional centered text
 */

import React from 'react'

export interface DividerProps {
  /** Divider style */
  style?: 'solid' | 'gradient' | 'dots' | 'dashed'
  /** Optional text to display in center of divider */
  text?: string
  /** Additional CSS classes */
  className?: string
}

export default function Divider({
  style = 'solid',
  text,
  className = '',
}: DividerProps) {
  const styleClass = `ds-divider-${style}`

  if (text) {
    const wrapperClasses = [
      'ds-divider-wrapper',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={wrapperClasses}>
        <div className={`ds-divider ${styleClass}`}></div>
        <span className="ds-divider-text">{text}</span>
        <div className={`ds-divider ${styleClass}`}></div>
      </div>
    )
  }

  const classes = [
    'ds-divider',
    styleClass,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes}></div>
}

















