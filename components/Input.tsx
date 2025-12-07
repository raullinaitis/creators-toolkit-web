/**
 * Input Component
 * 
 * Converted from snippets/ds-input.liquid
 * Text input with label, validation states, and consistent styling
 */

import React from 'react'
import { ErrorIcon } from './icons'

export interface InputProps {
  /** Input label text (required) */
  label: string
  /** Input name attribute (required) */
  name: string
  /** Placeholder text */
  placeholder?: string
  /** Default value */
  value?: string
  /** Input type - 'text' (default), 'email', 'tel', 'url', 'password' */
  type?: 'text' | 'email' | 'tel' | 'url' | 'password'
  /** Mark as required field */
  required?: boolean
  /** Disable input */
  disabled?: boolean
  /** Error message to display */
  error?: string
  /** Helper text below input */
  helpText?: string
  /** Additional CSS classes */
  className?: string
  /** Input ID (auto-generated from name if not provided) */
  id?: string
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input({
  label,
  name,
  placeholder,
  value,
  type = 'text',
  required = false,
  disabled = false,
  error,
  helpText,
  className = '',
  id,
  onChange,
}: InputProps) {
  const inputId = id || name
  const errorId = `${inputId}-error`
  const helpId = `${inputId}-help`
  
  // Build aria-describedby attribute
  const describedBy = [error ? errorId : '', helpText ? helpId : '']
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <div className={`ds-input-wrapper ${className} ${error ? 'ds-input-error-state' : ''}`}>
      <label htmlFor={inputId}>
        {label}
        {required && <span style={{ color: 'var(--color-error)' }}> *</span>}
      </label>
      <div className="ds-input-container">
        <input
          type={type}
          id={inputId}
          name={name}
          placeholder={placeholder}
          value={value}
          required={required}
          disabled={disabled}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          onChange={onChange}
        />
      </div>
      {helpText && (
        <div id={helpId} className="ds-input-help">
          {helpText}
        </div>
      )}
      {error && (
        <div id={errorId} className="ds-input-error">
          <ErrorIcon />
          {error}
        </div>
      )}
    </div>
  )
}

