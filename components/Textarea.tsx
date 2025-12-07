/**
 * Textarea Component
 * 
 * Converted from snippets/ds-textarea.liquid
 * Textarea with label, validation states, auto-resize, and character counter
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'

export interface TextareaProps {
  /** Textarea label text (required) */
  label: string
  /** Textarea name attribute (required) */
  name: string
  /** Placeholder text */
  placeholder?: string
  /** Default value */
  value?: string
  /** Number of visible rows (default: 4) */
  rows?: number
  /** Mark as required field */
  required?: boolean
  /** Disable textarea */
  disabled?: boolean
  /** Error message to display */
  error?: string
  /** Helper text below textarea */
  helpText?: string
  /** Additional CSS classes */
  className?: string
  /** Textarea ID (auto-generated from name if not provided) */
  id?: string
  /** Maximum character count */
  maxLength?: number
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function Textarea({
  label,
  name,
  placeholder,
  value = '',
  rows = 4,
  required = false,
  disabled = false,
  error,
  helpText,
  className = '',
  id,
  maxLength,
  onChange,
}: TextareaProps) {
  const textareaId = id || name
  const errorId = `${textareaId}-error`
  const helpId = `${textareaId}-help`
  const counterId = `${textareaId}-counter`
  
  const [currentValue, setCurrentValue] = useState(value)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  // Build aria-describedby attribute
  const describedBy = [
    error ? errorId : '',
    helpText ? helpId : '',
    maxLength ? counterId : '',
  ]
    .filter(Boolean)
    .join(' ') || undefined

  // Character counter logic
  const characterCount = currentValue.length
  const warningThreshold = maxLength ? maxLength * 0.9 : 0
  const showWarning = maxLength && characterCount >= warningThreshold

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setCurrentValue(newValue)
    if (onChange) {
      onChange(e)
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [currentValue])

  return (
    <div className={`ds-textarea-wrapper ${className} ${error ? 'ds-textarea-error-state' : ''}`}>
      <label htmlFor={textareaId}>
        {label}
        {required && <span style={{ color: 'var(--color-error)' }}> *</span>}
      </label>
      <div className="ds-textarea-container">
        <textarea
          ref={textareaRef}
          id={textareaId}
          name={name}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          value={currentValue}
          required={required}
          disabled={disabled}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          onChange={handleChange}
        />
      </div>
      {maxLength && (
        <div
          id={counterId}
          className={`ds-textarea-counter ${showWarning ? 'warning' : ''}`}
          aria-live="polite"
        >
          <span className="current-count">{characterCount}</span> / {maxLength} characters
        </div>
      )}
      {helpText && (
        <div id={helpId} className="ds-textarea-help">
          {helpText}
        </div>
      )}
      {error && (
        <div id={errorId} className="ds-textarea-error">
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

