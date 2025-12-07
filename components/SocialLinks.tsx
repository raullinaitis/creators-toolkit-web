/**
 * SocialLinks Component
 * 
 * Converted from snippets/ds-social-links.liquid
 * Social media icon links with consistent styling
 */

import React, { useId } from 'react'
import Link from 'next/link'

export interface SocialUrls {
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  youtube?: string
  tiktok?: string
}

export interface SocialLinksProps {
  /** Map of social URLs */
  urls?: SocialUrls
  /** [DEPRECATED] Individual URL props for backward compatibility */
  facebookUrl?: string
  instagramUrl?: string
  twitterUrl?: string
  linkedinUrl?: string
  youtubeUrl?: string
  tiktokUrl?: string
  /** Icon size */
  size?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
}

export default function SocialLinks({
  urls,
  facebookUrl,
  instagramUrl,
  twitterUrl,
  linkedinUrl,
  youtubeUrl,
  tiktokUrl,
  size = 'md',
  className = '',
}: SocialLinksProps) {
  // Merge urls object with individual props (individual props take precedence)
  const finalUrls: SocialUrls = {
    ...urls,
    ...(facebookUrl && { facebook: facebookUrl }),
    ...(instagramUrl && { instagram: instagramUrl }),
    ...(twitterUrl && { twitter: twitterUrl }),
    ...(linkedinUrl && { linkedin: linkedinUrl }),
    ...(youtubeUrl && { youtube: youtubeUrl }),
    ...(tiktokUrl && { tiktok: tiktokUrl }),
  }

  const classes = [
    'ds-social-links',
    `ds-social-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Unique gradient ID for this component instance (stable across server/client)
  const gradientId = `social-gradient-${size}-${useId()}`

  const socialIcons = {
    facebook: (
      <svg viewBox="0 0 24 24" className="ds-social-icon" aria-hidden="true" fill={`url(#${gradientId})`}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" className="ds-social-icon" aria-hidden="true" fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" className="ds-social-icon" aria-hidden="true" fill={`url(#${gradientId})`}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" className="ds-social-icon" aria-hidden="true" fill={`url(#${gradientId})`}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" className="ds-social-icon" aria-hidden="true" fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill={`url(#${gradientId})`}></polygon>
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 24 24" className="ds-social-icon" aria-hidden="true" fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
      </svg>
    ),
  }

  const socialItems = [
    { key: 'facebook', url: finalUrls.facebook, label: 'Facebook' },
    { key: 'instagram', url: finalUrls.instagram, label: 'Instagram' },
    { key: 'twitter', url: finalUrls.twitter, label: 'Twitter' },
    { key: 'linkedin', url: finalUrls.linkedin, label: 'LinkedIn' },
    { key: 'youtube', url: finalUrls.youtube, label: 'YouTube' },
    { key: 'tiktok', url: finalUrls.tiktok, label: 'TikTok' },
  ].filter((item) => item.url)

  if (socialItems.length === 0) return null

  return (
    <>
      {/* Gradient definition - rendered once per component instance */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--master-accent-primary)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'var(--master-accent-secondary)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      <ul className={classes}>
        {socialItems.map((item) => (
          <li key={item.key} className="ds-social-item">
            <Link
              href={item.url!}
              className="ds-social-link"
              aria-label={item.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {socialIcons[item.key as keyof typeof socialIcons]}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}













