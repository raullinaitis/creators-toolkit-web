/**
 * Alert Component
 * 
 * Converted from snippets/ds-alert.liquid
 * Alert/notification component for user feedback messages
 */

'use client'

import React, { useState } from 'react'

export interface AlertProps {
  /** Alert message text */
  message: string
  /** Alert variant */
  variant?: 'info' | 'success' | 'warning' | 'error'
  /** Alert title/heading */
  title?: string
  /** Show close button */
  dismissible?: boolean
  /** Custom icon SVG */
  iconSvg?: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

export default function Alert({
  message,
  variant = 'info',
  title,
  dismissible = false,
  iconSvg,
  className = '',
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const defaultIcons = {
    info: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    success: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    warning: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l9.5 16.5H2.5L12 2z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    error: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  }

  const icon = iconSvg || defaultIcons[variant]

  const handleClose = () => {
    setIsVisible(false)
  }

  const classes = [
    'ds-alert',
    `ds-alert-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="alert" aria-live="polite">
      <div className="ds-alert-icon">{icon}</div>
      <div className="ds-alert-content">
        {title && <div className="ds-alert-title">{title}</div>}
        <div className="ds-alert-message">{message}</div>
      </div>
      {dismissible && (
        <button
          className="ds-alert-close"
          aria-label="Close alert"
          onClick={handleClose}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  )
}

















