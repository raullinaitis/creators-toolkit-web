/**
 * NavItem Component
 * 
 * Converted from snippets/ds-nav-item.liquid
 * Navigation link item with active state and hover effects
 */

'use client'

import React from 'react'
import Link from 'next/link'

export interface NavItemProps {
  /** Navigation link text */
  text: string
  /** Link destination */
  url: string
  /** Mark as active/current page */
  active?: boolean
  /** Additional CSS classes */
  className?: string
  /** Link target attribute (e.g., '_blank') */
  target?: string
  /** Optional click handler (e.g., to close mobile nav) */
  onClick?: () => void
}

export default function NavItem({
  text,
  url,
  active = false,
  className = '',
  target,
  onClick,
}: NavItemProps) {
  const classes = [
    'ds-nav-item',
    active ? 'ds-nav-item--active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Link
      href={url}
      className={classes}
      target={target}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
    >
      {text}
    </Link>
  )
}

