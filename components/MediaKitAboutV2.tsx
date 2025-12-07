/**
 * Media Kit About V2 Component
 * Complete pixel-perfect recreation of the ds-mediakit-about-v2.liquid section
 *
 * Features:
 * - Grid overlay background effect with radial gradient
 * - Two-column layout (desktop) / Single column (mobile)
 * - Profile image with gradient border
 * - Social media buttons with frosted glass effect
 * - Three content blocks using minimal card design
 * - Scroll-triggered animations
 * - Mobile image swapping
 */

'use client'
/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { SectionTitle, SocialLinks, SectionParallax } from '@/components'

interface ContentBlock {
  title: string
  content: string
}

interface SocialLink {
  platform: 'instagram' | 'youtube' | 'tiktok' | 'whatsapp'
  url: string
  label: string
}

export interface MediaKitAboutV2Props {
  sectionTitle?: string
  sectionSubtitle?: string
  profileImage?: string
  profileImageAlt?: string
  socialLinks?: SocialLink[]
  contentBlocks?: ContentBlock[]
}

export default function MediaKitAboutV2({
  sectionTitle = 'The Man Behind the Creativity',
  sectionSubtitle = 'I don\'t chase views — I build content that keeps performing.',
  profileImage,
  profileImageAlt,
  socialLinks = [],
  contentBlocks = [],
}: MediaKitAboutV2Props) {

  return (
    <SectionParallax className="ds-media-kit-about-v2-section" gridSpeed={0.5}>
      {/* Grid overlay background effect */}
      <div className="ds-media-kit-about-v2-container">
        {/* Section Header - Centered Above Both Columns */}
        {(sectionTitle || sectionSubtitle) && (
          <div className="section-header-centered">
            {sectionTitle && (
              <SectionTitle>{sectionTitle}</SectionTitle>
            )}

            {sectionSubtitle && (
              <p className="ds-section-heading-subtitle">
                {sectionSubtitle}
              </p>
            )}
          </div>
        )}

        <div className="two-column-layout">
          {/* LEFT COLUMN: Profile Image & Social */}
          <div className="left-column">
            <div>
              {/* Profile Image */}
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
                  <div className="profile-image profile-image-placeholder">
                    Profile Image
                  </div>
                )}
              </div>

              {/* Social Buttons (Desktop) */}
              {socialLinks.length > 0 && (
                <div className="social-buttons-wrapper">
                  <SocialLinks
                    urls={socialLinks.reduce((acc, link) => {
                      if (link.platform === 'instagram') acc.instagram = link.url
                      else if (link.platform === 'youtube') acc.youtube = link.url
                      else if (link.platform === 'tiktok') acc.tiktok = link.url
                      return acc
                    }, {} as { instagram?: string; youtube?: string; tiktok?: string })}
                  />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Content */}
          <div className="right-column">
            {/* Mobile Profile Image (Hidden on Desktop) */}
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
                <div className="profile-image profile-image-placeholder">
                  Profile Image
                </div>
              )}
            </div>

            {/* Social Buttons (Mobile) */}
            {socialLinks.length > 0 && (
              <div className="social-buttons-wrapper mobile-social-buttons">
                <SocialLinks
                  urls={socialLinks.reduce((acc, link) => {
                    if (link.platform === 'instagram') acc.instagram = link.url
                    else if (link.platform === 'youtube') acc.youtube = link.url
                    else if (link.platform === 'tiktok') acc.tiktok = link.url
                    return acc
                  }, {} as { instagram?: string; youtube?: string; tiktok?: string })}
                />
              </div>
            )}

            {/* Content Blocks */}
            {contentBlocks.length > 0 && (
              <div className="content-blocks">
                {contentBlocks.map((block, index) => (
                  <div key={index} className="content-block ds-minimal-card ds-card--hover">
                    <h3 className="block-title">{block.title}</h3>
                    <p className="block-content">{block.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionParallax>
  )
}

