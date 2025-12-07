/**
 * Select Component
 * 
 * Converted from snippets/ds-select.liquid
 * Custom dropdown select with styling matching Dropdown component
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ErrorIcon } from './icons'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  /** Select label text (required) */
  label: string
  /** Select name attribute (required) */
  name: string
  /** Array of option objects with label and value keys */
  options: SelectOption[]
  /** Pre-selected value */
  selected?: string
  /** Mark as required field */
  required?: boolean
  /** Disable select */
  disabled?: boolean
  /** Error message to display */
  error?: string
  /** Helper text below select */
  helpText?: string
  /** Placeholder option text (default: 'Select an option') */
  placeholder?: string
  /** Additional CSS classes */
  className?: string
  /** Select ID (auto-generated from name if not provided) */
  id?: string
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export function Select({
  label,
  name,
  options,
  selected,
  required = false,
  disabled = false,
  error,
  helpText,
  placeholder = 'Select an option',
  className = '',
  id,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(selected || '')
  const selectRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const hiddenSelectRef = useRef<HTMLSelectElement>(null)

  const selectId = id || name
  const errorId = `${selectId}-error`
  const helpId = `${selectId}-help`

  // Sync with external selected prop
  useEffect(() => {
    if (selected !== undefined) {
      setValue(selected)
    }
  }, [selected])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen])

  // Close dropdown on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // Focus first item when menu opens
  useEffect(() => {
    if (isOpen && itemRefs.current[0]) {
      itemRefs.current[0].focus()
    }
  }, [isOpen])

  const selectedOption = options.find((opt) => opt.value === value)
  const displayText = selectedOption ? selectedOption.label : placeholder

  const handleOptionClick = (optionValue: string) => {
    setValue(optionValue)
    setIsOpen(false)
    
    // Trigger onChange event for form compatibility
    if (hiddenSelectRef.current) {
      hiddenSelectRef.current.value = optionValue
      const syntheticEvent = {
        target: hiddenSelectRef.current,
        currentTarget: hiddenSelectRef.current,
      } as React.ChangeEvent<HTMLSelectElement>
      onChange?.(syntheticEvent)
    }
  }

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
      } else if (itemRefs.current[0]) {
        itemRefs.current[0].focus()
      }
    }
  }

  const handleItemKeyDown = (
    e: React.KeyboardEvent,
    index: number
  ) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = index + 1 < options.length ? index + 1 : 0
      itemRefs.current[nextIndex]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIndex = index - 1 >= 0 ? index - 1 : options.length - 1
      itemRefs.current[prevIndex]?.focus()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsOpen(false)
      triggerRef.current?.focus()
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleOptionClick(options[index].value)
    }
  }

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  // Build aria-describedby attribute
  const describedBy = [error ? errorId : '', helpText ? helpId : '']
    .filter(Boolean)
    .join(' ') || undefined

  const chevronIcon = (
    <svg
      className="ds-select-chevron"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )

  return (
    <div
      ref={selectRef}
      className={`ds-select-wrapper ${className} ${error ? 'ds-select-error-state' : ''}`}
    >
      <label htmlFor={selectId}>
        {label}
        {required && <span style={{ color: 'var(--color-error)' }}> *</span>}
      </label>
      
      {/* Hidden native select for form submission */}
      <select
        ref={hiddenSelectRef}
        id={selectId}
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        style={{ display: 'none' }}
        onChange={onChange || (() => {})}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="ds-select-container" data-expanded={isOpen}>
        <button
          ref={triggerRef}
          type="button"
          className={`ds-select-trigger ${disabled ? 'ds-select-disabled' : ''}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-describedby={describedBy}
          onClick={toggleDropdown}
          onKeyDown={handleTriggerKeyDown}
          disabled={disabled}
        >
          <span
            className={`ds-select-value ${!selectedOption ? 'ds-select-placeholder' : ''}`}
          >
            {displayText}
          </span>
          {chevronIcon}
        </button>
        <div
          ref={menuRef}
          className="ds-select-menu"
          role="listbox"
          aria-hidden={!isOpen}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              className={`ds-select-item ${value === option.value ? 'ds-select-item-selected' : ''}`}
              role="option"
              aria-selected={value === option.value}
              tabIndex={isOpen ? 0 : -1}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              onKeyDown={(e) => handleItemKeyDown(e, index)}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {helpText && (
        <div id={helpId} className="ds-select-help">
          {helpText}
        </div>
      )}
      {error && (
        <div id={errorId} className="ds-select-error">
          <ErrorIcon />
          {error}
        </div>
      )}
    </div>
  )
}

