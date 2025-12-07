/**
 * Breadcrumb Component
 * 
 * Converted from snippets/ds-breadcrumb.liquid
 * Breadcrumb navigation with links and current page indicator
 */

import React from 'react'
import Link from 'next/link'

export interface BreadcrumbItem {
  /** Breadcrumb item text */
  text: string
  /** Breadcrumb item URL (empty string for current page) */
  url?: string
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[]
  /** Custom separator SVG icon */
  separatorSvg?: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

export default function Breadcrumb({
  items,
  separatorSvg,
  className = '',
}: BreadcrumbProps) {
  const defaultSeparator = (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 3L8 6L4 9V3Z"
        fill="currentColor"
      />
    </svg>
  )

  const separator = separatorSvg || defaultSeparator

  return (
    <nav
      aria-label="Breadcrumb"
      className={`ds-breadcrumb-wrapper ${className}`.trim()}
    >
      <ol className="ds-breadcrumb">
        {items.map((item, index) => (
          <li key={index} className="ds-breadcrumb-item">
            {item.url ? (
              <Link href={item.url} className="ds-breadcrumb-link">
                {item.text}
              </Link>
            ) : (
              <span className="ds-breadcrumb-current" aria-current="page">
                {item.text}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="ds-breadcrumb-separator" aria-hidden="true">
                {separator}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

