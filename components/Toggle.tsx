/**
 * Toggle Component
 * 
 * Converted from snippets/ds-toggle.liquid
 * Toggle switch with smooth animation and label positioning
 */

'use client'

import React, { useState } from 'react'

export interface ToggleProps {
  /** Toggle label text (required) */
  label: string
  /** Toggle name attribute (required) */
  name: string
  /** Pre-checked state */
  checked?: boolean
  /** Disable toggle */
  disabled?: boolean
  /** Error message to display */
  error?: string
  /** Additional CSS classes */
  className?: string
  /** Toggle ID (auto-generated from name if not provided) */
  id?: string
  /** Label position - 'left' (default), 'right' */
  labelPosition?: 'left' | 'right'
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Toggle({
  label,
  name,
  checked: controlledChecked,
  disabled = false,
  error,
  className = '',
  id,
  labelPosition = 'left',
  onChange,
}: ToggleProps) {
  const [internalChecked, setInternalChecked] = useState(false)
  
  // Support both controlled and uncontrolled usage
  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked : internalChecked

  const toggleId = id || name
  const errorId = `${toggleId}-error`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked)
    }
    onChange?.(e)
  }

  return (
    <div className={`ds-toggle-wrapper ${className} ${error ? 'ds-toggle-error-state' : ''}`}>
      <label htmlFor={toggleId} style={{ flexDirection: labelPosition === 'right' ? 'row' : 'row-reverse' }}>
        <input
          type="checkbox"
          id={toggleId}
          name={name}
          role="switch"
          aria-checked={checked}
          checked={checked}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          onChange={handleChange}
        />
        <span className="ds-toggle-track">
          <span className="ds-toggle-handle"></span>
        </span>
        {label}
      </label>
      {error && (
        <div id={errorId} className="ds-toggle-error">
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
          {error}
        </div>
      )}
    </div>
  )
}

