/**
 * NavBar Component
 *
 * Site-wide navigation bar with creators-toolkit.com branding
 * and main page links (Home, Media Kit)
 */

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavItem } from '@/components'

export default function NavBar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleNav = () => setIsOpen((prev) => !prev)
  const closeNav = () => setIsOpen(false)
  
  const navItems = [
    { text: 'Home', url: '/', active: pathname === '/' },
    { text: 'Media Kit', url: '/media-kit', active: pathname === '/media-kit' },
  ]

  return (
    <nav className="ds-nav-bar">
      <div className="ds-nav-bar-container">
        <Link
          href="/"
          className="ds-nav-bar-brand"
          onClick={closeNav}
        >
          Creators Toolkit
        </Link>
        <button
          type="button"
          className="ds-nav-toggle"
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          aria-label="Toggle navigation"
          onClick={toggleNav}
        >
          <span className="ds-nav-toggle-bar" />
          <span className="ds-nav-toggle-bar" />
          <span className="ds-nav-toggle-bar" />
        </button>
        <div className={`ds-nav-bar-links ${isOpen ? 'is-open' : ''}`} id="primary-nav">
          {navItems.map((item) => (
            <NavItem
              key={item.url}
              text={item.text}
              url={item.url}
              active={item.active}
              onClick={closeNav}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}
