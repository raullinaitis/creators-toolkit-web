/**
 * Footer Component
 * 
 * Site-wide footer with navigation links, copyright, and optional social links
 */

import React from 'react'
import Link from 'next/link'
import SocialLinks from './SocialLinks'

export interface FooterProps {
  /** Social media URLs */
  socialUrls?: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
    youtube?: string
    tiktok?: string
  }
  /** Copyright text (defaults to current year) */
  copyrightText?: string
  /** Additional CSS classes */
  className?: string
}

export default function Footer({
  socialUrls,
  copyrightText,
  className = '',
}: FooterProps) {
  const currentYear = new Date().getFullYear()
  const copyright = copyrightText || `© ${currentYear} creators-toolkit. All rights reserved.`

  const navItems = [
    { text: 'Home', url: '/' },
    { text: 'Media Kit', url: '/media-kit' },
  ]

  return (
    <footer className={`ds-footer ${className}`}>
      <div className="ds-footer-container">
        <div className="ds-footer-content">
          {/* Brand */}
          <div className="ds-footer-brand">
            <Link href="/" className="ds-footer-brand-link">
              creators-toolkit
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="ds-footer-nav">
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className="ds-footer-nav-link"
              >
                {item.text}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          {socialUrls && Object.values(socialUrls).some(Boolean) && (
            <div className="ds-footer-social">
              <SocialLinks urls={socialUrls} size="sm" />
            </div>
          )}

          {/* Copyright */}
          <div className="ds-footer-copyright">
            <p>{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

