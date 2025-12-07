/**
 * Blockquote Component
 * 
 * Converted from snippets/ds-blockquote.liquid
 * Featured quote component with author attribution
 */

import React from 'react'
import Link from 'next/link'

export interface BlockquoteProps {
  /** Quote text content */
  quote: string
  /** Quote author name */
  author: string
  /** Author role/title */
  role?: string
  /** Citation URL (link to source) */
  citeUrl?: string
  /** Show decorative quote icon */
  showIcon?: boolean
  /** Additional CSS classes */
  className?: string
}

export default function Blockquote({
  quote,
  author,
  role,
  citeUrl,
  showIcon = true,
  className = '',
}: BlockquoteProps) {
  const classes = [
    'ds-blockquote',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const quoteIcon = (
    <svg
      className="quote-icon"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 8c0-2.2 1.8-4 4-4s4 1.8 4 4v8c0 2.2-1.8 4-4 4h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-2c0-1.1.9-2 2-2h4c3.3 0 6-2.7 6-6V8c0-4.4-3.6-8-8-8s-8 3.6-8 8v8c0 1.1.9 2 2 2s2-.9 2-2V8z" />
    </svg>
  )

  return (
    <div className={classes}>
      {showIcon && quoteIcon}
      <blockquote>{quote}</blockquote>
      <cite>
        {citeUrl ? (
          <Link
            href={citeUrl}
            aria-label={role ? `${author}, ${role}` : author}
          >
            <span className="gradient-accent">{author}</span>
            {role && <span className="role">{role}</span>}
          </Link>
        ) : (
          <>
            <span className="gradient-accent">{author}</span>
            {role && <span className="role">{role}</span>}
          </>
        )}
      </cite>
    </div>
  )
}

















