/**
 * Checkbox Component
 * 
 * Converted from snippets/ds-checkbox.liquid
 * Custom styled checkbox with visual indicator and label
 */

'use client'

import React, { useState } from 'react'
import { ErrorIcon } from './icons'

export interface CheckboxProps {
  /** Checkbox label text (required) */
  label: string
  /** Checkbox name attribute (required) */
  name: string
  /** Checkbox value (default: 'on') */
  value?: string
  /** Pre-checked state */
  checked?: boolean
  /** Mark as required field */
  required?: boolean
  /** Disable checkbox */
  disabled?: boolean
  /** Error message to display */
  error?: string
  /** Additional CSS classes */
  className?: string
  /** Checkbox ID (auto-generated from name if not provided) */
  id?: string
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Checkbox({
  label,
  name,
  value = 'on',
  checked: controlledChecked,
  required = false,
  disabled = false,
  error,
  className = '',
  id,
  onChange,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(false)
  
  // Support both controlled and uncontrolled usage
  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked : internalChecked

  const checkboxId = id || name
  const errorId = `${checkboxId}-error`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked)
    }
    onChange?.(e)
  }

  return (
    <div className={`ds-checkbox-wrapper ${className} ${error ? 'ds-checkbox-error-state' : ''}`}>
      <label htmlFor={checkboxId}>
        <input
          type="checkbox"
          id={checkboxId}
          name={name}
          value={value}
          checked={checked}
          required={required}
          disabled={disabled}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          onChange={handleChange}
        />
        <span className="ds-checkbox-visual">
          <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M11.6667 3.5L5.25 9.91667L2.33333 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </span>
        {label}
      </label>
      {error && (
        <div id={errorId} className="ds-checkbox-error">
          <ErrorIcon />
          {error}
        </div>
      )}
    </div>
  )
}

