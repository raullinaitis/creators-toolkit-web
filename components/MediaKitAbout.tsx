/**
 * Media Kit About Component
 * 
 * Converted from Shopify Liquid section to React/Next.js
 * Two-column layout with profile image and content blocks
 */

'use client'
/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { Card } from '@/components'

interface ContentBlock {
  title: string
  content: string
}

interface SocialLink {
  platform: 'instagram' | 'youtube' | 'tiktok' | 'whatsapp'
  url: string
  label: string
}

interface MediaKitAboutProps {
  sectionTitle?: string
  sectionSubtitle?: string
  profileImage?: string
  profileImageAlt?: string
  socialLinks?: SocialLink[]
  contentBlocks?: ContentBlock[]
}

/**
 * Process headline text to convert [[text]] to gradient accent spans
 */
function processGradientText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const regex = /\[\[([^\]]+)\]\]/g
  let lastIndex = 0
  let match
  let key = 0

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index)
      if (beforeText) {
        parts.push(beforeText)
      }
    }

    parts.push(
      <span key={key++} className="gradient-accent">
        {match[1]}
      </span>
    )

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}

const getSocialIcon = (platform: string, isMobile: boolean = false) => {
  const gradientId = isMobile ? 'social-gradient-mobile' : 'social-gradient-desktop'
  
  switch (platform) {
    case 'instagram':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    case 'youtube':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill={`url(#${gradientId})`}></polygon>
        </svg>
      )
    case 'tiktok':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
        </svg>
      )
    case 'whatsapp':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      )
    default:
      return null
  }
}

export default function MediaKitAbout({
  sectionTitle = 'The [[Creator]] Behind',
  sectionSubtitle = 'I combine craft, insight, and consistency to make content that keeps performing.',
  profileImage,
  profileImageAlt,
  socialLinks = [],
  contentBlocks = [],
}: MediaKitAboutProps) {

  return (
    <section className="ds-media-kit-about-section">
      <div className="ds-media-kit-about-container">
        <div className="two-column-layout">
          {/* Left Column: Profile Image */}
          <div className="left-column">
            <div>
              <div className="profile-image-wrapper">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={profileImageAlt || sectionTitle}
                    className="profile-image"
                    width={600}
                    height={600}
                    loading="lazy"
                  />
                ) : (
                  <div className="profile-image" style={{
                    background: 'var(--color-background-minimal)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-muted)',
                  }}>
                    Profile Image
                  </div>
                )}
              </div>

              {/* Social Media Buttons (Below Desktop Image) */}
              {socialLinks.length > 0 && (
                <div className="social-buttons-wrapper">
                  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <defs>
                      <linearGradient id="social-gradient-desktop" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'var(--master-accent-primary)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'var(--master-accent-secondary)', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                  </svg>

                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-button"
                      aria-label={link.label}
                    >
                      {getSocialIcon(link.platform, false)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="right-column">
            {/* Section Header */}
            {sectionTitle && (
              <h2 className="section-title">
                {processGradientText(sectionTitle)}
              </h2>
            )}

            {sectionSubtitle && (
              <p className="section-subtitle">
                {sectionSubtitle}
              </p>
            )}

            {/* Mobile Profile Image */}
            <div className="mobile-profile-image-wrapper">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={profileImageAlt || sectionTitle}
                  className="profile-image"
                  width={600}
                  height={600}
                  loading="lazy"
                />
              ) : (
                <div className="profile-image" style={{
                  background: 'var(--color-background-minimal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-muted)',
                }}>
                  Profile Image
                </div>
              )}
            </div>

            {/* Social Media Buttons (Below Mobile Image) */}
            {socialLinks.length > 0 && (
              <div className="social-buttons-wrapper mobile-social-buttons">
                <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                  <defs>
                    <linearGradient id="social-gradient-mobile" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'var(--master-accent-primary)', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: 'var(--master-accent-secondary)', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                </svg>

                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button"
                    aria-label={link.label}
                  >
                    {getSocialIcon(link.platform, true)}
                  </a>
                ))}
              </div>
            )}

            {/* Content Blocks */}
            {contentBlocks.length > 0 && (
              <div className="content-blocks">
                {contentBlocks.map((block, index) => (
                  <Card key={index} className="content-block">
                    <h3 className="block-title">{block.title}</h3>
                    <p className="block-content">{block.content}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

