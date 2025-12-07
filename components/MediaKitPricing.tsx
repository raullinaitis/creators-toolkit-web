/**
 * Media Kit Pricing Component
 * 
 * Converted from Shopify Liquid section to React/Next.js
 * Displays pricing packages with features
 */

'use client'

import React from 'react'
import { ButtonPrimary, ButtonSecondary, Card, SectionTitle, SectionParallax } from '@/components'

interface PricingFeature {
  title: string
  description: string
}

interface PricingPackage {
  name: string
  price: string
  subtext?: string
  features: PricingFeature[]
  buttonText: string
  buttonLink?: string
  badgeText?: string
  isPopular?: boolean
}

interface MediaKitPricingProps {
  sectionTitle?: string
  sectionSubtitle?: string
  packages?: PricingPackage[]
}


// Handle smooth scroll for anchor links
const handleLinkClick = (href: string) => {
  if (href.startsWith('#')) {
    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ block: 'start' })
    }
  }
}

export default function MediaKitPricing({
  sectionTitle = 'Explore The Packages',
  sectionSubtitle = 'Choose a plan that matches your reach, timeline, and creative needs.',
  packages = [],
}: MediaKitPricingProps) {

  return (
    <SectionParallax id="pricing-section" className="ds-media-kit-pricing-section" gridSpeed={0.5}>
      <div className="ds-media-kit-pricing-container">
        {/* Section Header */}
        {sectionTitle && (
          <SectionTitle>{sectionTitle}</SectionTitle>
        )}

        {sectionSubtitle && (
          <p className="ds-section-heading-subtitle">
            {sectionSubtitle}
          </p>
        )}

        {/* Pricing Cards */}
        {packages.length > 0 && (
          <div className="pricing-grid">
            {packages.map((pkg, index) => (
              <PricingCard
                key={index}
                pkg={pkg}
              />
            ))}
          </div>
        )}
      </div>
    </SectionParallax>
  )
}

// Pricing Card Component
interface PricingCardProps {
  pkg: PricingPackage
}

function PricingCard({ pkg }: PricingCardProps) {
  const ButtonComponent = pkg.isPopular ? ButtonPrimary : ButtonSecondary

  return (
    <div className="pricing-card-wrapper">
      {pkg.badgeText && (
        <div className="popular-badge">{pkg.badgeText}</div>
      )}
      
      <Card className="pricing-card" hover>
        <h3 className="pricing-name">{pkg.name}</h3>
        <div className="pricing-price">{pkg.price}</div>
        
        {pkg.subtext && (
          <p className="pricing-subtext">{pkg.subtext}</p>
        )}

        <ul className="pricing-features">
          {pkg.features.map((feature, index) => (
            <li key={index}>
              <span className="feature-title">{feature.title}</span>
              <span className="feature-desc">{feature.description}</span>
            </li>
          ))}
        </ul>

        <div className="pricing-button">
          <ButtonComponent
            text={pkg.buttonText}
            url={pkg.buttonLink?.startsWith('#') ? undefined : pkg.buttonLink}
            onClick={pkg.buttonLink?.startsWith('#') ? () => handleLinkClick(pkg.buttonLink!) : undefined}
            size="md"
          />
        </div>
      </Card>
    </div>
  )
}















