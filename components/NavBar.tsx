/**
 * NavBar Component
 *
 * Site-wide navigation bar with creators-toolkit.com branding
 * and main page links (Home, Media Kit)
 */

'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavItem } from '@/components'

export default function NavBar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleNav = () => setIsOpen((prev) => !prev)
  const closeNav = () => setIsOpen(false)

  const isActive = (url: string) => {
    if (url === '/') return pathname === '/'
    return pathname.startsWith(url)
  }

  const primaryNav = [
    { text: 'Media Kit', url: '/media-kit' },
    { text: 'Nano Banana Pro Prompt Pack', url: '/nano-banana-pro-prompt-pack' },
  ]

  useEffect(() => {
    // Close overlays when route changes
    setIsOpen(false)
  }, [pathname])
  
  return (
    <>
      <nav className="ds-nav-bar" aria-label="Primary navigation">
        <div className="ds-nav-bar-container">
          <Link
            href="/"
            className="ds-nav-bar-brand"
            onClick={() => {
              closeNav()
            }}
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
            {primaryNav.map((item) => (
              <NavItem
                key={item.url}
                text={item.text}
                url={item.url}
                active={isActive(item.url)}
                onClick={() => {
                  closeNav()
                }}
              />
            ))}
          </div>
        </div>
      </nav>

      <div className="ds-bottom-nav" aria-label="Quick navigation">
        <div className="ds-bottom-nav-list">
          {primaryNav.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className={`ds-bottom-nav-item ${isActive(item.url) ? 'is-active' : ''}`}
              aria-current={isActive(item.url) ? 'page' : undefined}
              onClick={closeNav}
            >
              <span className="ds-bottom-nav-label">{item.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
