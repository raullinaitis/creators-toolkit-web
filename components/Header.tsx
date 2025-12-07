/**
 * Header Component
 * 
 * Reusable navigation header used across pages
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { NavItem } from '@/components'

interface HeaderProps {
  logoText?: string
  logoUrl?: string
  navItems?: Array<{ text: string; url: string; active?: boolean }>
}

export default function Header({
  logoText = '',
  logoUrl = '/',
  navItems = [
    // Removed Home and Media Kit from default nav items
  ],
}: HeaderProps) {
  // Handle smooth scroll for anchor links
  const handleLinkClick = (href: string, e?: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e?.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ block: 'start' })
      }
    }
  }

  return (
    <nav className="ds-main-navigation">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-md)',
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
        padding: 'var(--space-lg) var(--container-padding)',
      }}>
        <Link 
          href={logoUrl}
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'calc(var(--fs-h4) * 1.15)', /* Slightly bigger */
            fontWeight: 'var(--fw-bold)',
            background: 'var(--gradient-primary)', /* Accent color gradient */
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textDecoration: 'none',
          }}
        >
          {logoText}
        </Link>
        <div style={{ 
          display: 'flex', 
          gap: 'var(--space-md)', 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {navItems.map((item) => (
            item.url.startsWith('#') ? (
              <a
                key={item.url}
                href={item.url}
                className="ds-nav-item"
                onClick={(e) => handleLinkClick(item.url, e)}
              >
                {item.text}
              </a>
            ) : (
              <NavItem
                key={item.url}
                text={item.text}
                url={item.url}
                active={item.active}
              />
            )
          ))}
        </div>
      </div>
    </nav>
  )
}

