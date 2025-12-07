/**
 * CTA Banner Component
 * 
 * Final call-to-action banner section
 */

'use client'

import React from 'react'
import { ButtonPrimary } from '@/components'

interface CtaBannerProps {
  headline?: string
  subheadline?: string
  buttonText?: string
  buttonLink?: string
  price?: string
  className?: string
}

export default function CtaBanner({
  headline,
  subheadline,
  buttonText,
  buttonLink,
  price,
  className = '',
}: CtaBannerProps) {
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
    <section className={`ds-cta-banner-section ${className}`}>
      <div className="ds-cta-banner-container">
        {headline && (
          <h2 className="ds-cta-banner-headline">
            {headline}
          </h2>
        )}

        {subheadline && (
          <p className="ds-cta-banner-subheadline">
            {subheadline}
          </p>
        )}

        {buttonText && (
          <div className="ds-cta-banner-cta">
            <ButtonPrimary
              text={price ? `${buttonText} (${price})` : buttonText}
              url={buttonLink?.startsWith('#') ? undefined : buttonLink}
              onClick={buttonLink?.startsWith('#') ? () => handleLinkClick(buttonLink) : undefined}
              size="lg"
            />
          </div>
        )}
      </div>
    </section>
  )
}






