/**
 * Pricing Stack Component
 * 
 * Vertical stack with value checklist and pricing
 */

'use client'

import React from 'react'
import { ButtonPrimary, SectionTitle } from '@/components'

interface PricingStackProps {
  headline?: string
  subheadline?: string
  features?: string[]
  badge?: string
  priceAnchor?: string
  priceActual?: string
  buttonText?: string
  buttonLink?: string
  microCopy?: string
  className?: string
}

export default function PricingStack({
  headline,
  subheadline,
  features = [],
  badge,
  priceAnchor,
  priceActual,
  buttonText,
  buttonLink,
  microCopy,
  className = '',
}: PricingStackProps) {
  const handleLinkClick = (href: string) => {
    if (href?.startsWith('#')) {
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ block: 'start' })
      }
    }
  }

  return (
    <section id="pricing" className={`ds-pricing-stack-section ${className}`}>
      <div className="ds-pricing-stack-container">
        {headline && (
          <SectionTitle>{headline}</SectionTitle>
        )}

        {subheadline && (
          <p className="ds-pricing-stack-subheadline">
            {subheadline}
          </p>
        )}

        <div className="ds-pricing-stack-content">
          {/* Features Checklist */}
          {features.length > 0 && (
            <div className="ds-pricing-stack-features">
              {features.map((feature, index) => (
                <div key={index} className="ds-pricing-stack-feature-item">
                  <svg
                    className="ds-pricing-stack-checkmark"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Badge */}
          {badge && (
            <div className="ds-pricing-stack-badge">
              <span className="ds-pricing-stack-badge-text">{badge}</span>
            </div>
          )}

          {/* Pricing */}
          <div className="ds-pricing-stack-pricing">
            {priceAnchor && (
              <span className="ds-pricing-stack-price-anchor">
                {priceAnchor}
              </span>
            )}
            {priceActual && (
              <span className="ds-pricing-stack-price-actual">
                {priceActual}
              </span>
            )}
          </div>

          {/* CTA Button */}
          {buttonText && (
            <div className="ds-pricing-stack-cta">
              <ButtonPrimary
                text={buttonText}
                url={buttonLink?.startsWith('#') ? undefined : buttonLink}
                onClick={buttonLink?.startsWith('#') ? () => handleLinkClick(buttonLink) : undefined}
                size="lg"
              />
            </div>
          )}

          {/* Payment Icons */}
          <div className="ds-pricing-stack-payment-icons">
            <span className="ds-pricing-stack-payment-icon">💳</span>
            <span className="ds-pricing-stack-payment-icon">🅿️</span>
            <span className="ds-pricing-stack-payment-text">Secure payment</span>
          </div>

          {/* Micro Copy */}
          {microCopy && (
            <p className="ds-pricing-stack-micro-copy">
              {microCopy}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

