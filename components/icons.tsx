/**
 * Shared Icon Components
 * 
 * Reusable icon components used across multiple components
 */

import React from 'react'

/**
 * Error Icon Component
 * 
 * Standard error icon used in form validation
 */
export function ErrorIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 4v4M8 10v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

