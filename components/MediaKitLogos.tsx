/**
 * Media Kit Logos Component
 * 
 * Converted from Shopify Liquid section to React/Next.js
 * Displays a grid of client logo cards with hover effects
 */

'use client'
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef } from 'react'
import { Card, SectionTitle, SectionParallax } from '@/components'

interface Logo {
  id: string
  brandName: string
  logoUrl: string
  logoAlt?: string
}

interface MediaKitLogosProps {
  headline?: string
  subheadline?: string
  logoSize?: number // in pixels, default 45
  logos?: Logo[]
}


export default function MediaKitLogos({
  headline = '[[Trusted]] by Leading Brands',
  subheadline = 'I\'ve collaborated with top names in AI, SaaS, and tech.',
  logoSize = 45,
  logos = [],
}: MediaKitLogosProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--logo-max-height', `${logoSize}px`)
    }
  }, [logoSize])

  return (
    <SectionParallax 
      className="ds-media-kit-logos-section"
      gridSpeed={0.5}
    >
      <div 
        ref={containerRef}
        className="ds-media-kit-logos-container"
      >
        {/* Section Header */}
        {headline && (
          <SectionTitle>{headline}</SectionTitle>
        )}

        {subheadline && (
          <p className="ds-section-heading-subtitle">
            {subheadline}
          </p>
        )}

        {/* Logo Cards Grid */}
        {logos.length > 0 && (
          <div className="logo-grid">
            {logos.slice(0, 12).map((logo) => (
              <Card
                key={logo.id}
                className="logo-card"
                hover
              >
                  <div className="logo-section">
                    <img
                      src={logo.logoUrl}
                      alt={logo.logoAlt || logo.brandName}
                      width={200}
                      height={200}
                      loading="lazy"
                      className="logo-image"
                    />
                  </div>
                </Card>
            ))}
          </div>
        )}
      </div>
    </SectionParallax>
  )
}

