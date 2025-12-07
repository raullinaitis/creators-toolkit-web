/**
 * Dropdown Component
 * 
 * Converted from snippets/ds-dropdown.liquid
 * Dropdown menu with keyboard navigation and accessibility support
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export interface DropdownItem {
  /** Menu item text */
  text: string
  /** Menu item URL */
  url: string
}

export interface DropdownProps {
  /** Dropdown trigger button text */
  triggerText: string
  /** Icon for trigger button */
  triggerIconSvg?: React.ReactNode
  /** Array of menu items */
  items: DropdownItem[]
  /** Menu alignment - 'left' (default) or 'right' */
  align?: 'left' | 'right'
  /** Additional CSS classes */
  className?: string
}

export default function Dropdown({
  triggerText,
  triggerIconSvg,
  items,
  align = 'left',
  className = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter') {
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
      const nextIndex = index + 1 < items.length ? index + 1 : 0
      itemRefs.current[nextIndex]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIndex = index - 1 >= 0 ? index - 1 : items.length - 1
      itemRefs.current[prevIndex]?.focus()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsOpen(false)
      triggerRef.current?.focus()
    }
  }

  const classes = [
    'ds-dropdown',
    `ds-dropdown-${align}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const chevronIcon = (
    <svg
      className="ds-dropdown-chevron"
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
      ref={dropdownRef}
      className={classes}
      data-dropdown
      data-expanded={isOpen}
    >
      <button
        ref={triggerRef}
        className="ds-dropdown-trigger"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        onKeyDown={handleTriggerKeyDown}
      >
        {triggerIconSvg && (
          <span className="ds-dropdown-trigger-icon">{triggerIconSvg}</span>
        )}
        <span className="ds-dropdown-trigger-text">{triggerText}</span>
        {chevronIcon}
      </button>
      <div
        ref={menuRef}
        className="ds-dropdown-menu"
        role="menu"
        aria-hidden={!isOpen}
      >
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className="ds-dropdown-item"
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
            ref={(el) => {
              itemRefs.current[index] = el
            }}
            onKeyDown={(e) => handleItemKeyDown(e, index)}
            onClick={() => setIsOpen(false)}
          >
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  )
}

