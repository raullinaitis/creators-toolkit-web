/**
 * Media Kit Hero Component
 * 
 * Converted from Shopify Liquid section to React/Next.js
 * Hero section with badge, headline, and CTAs
 */

'use client'

import React from 'react'
import { ButtonPrimary, ButtonSecondary, Badge, SectionParallax } from '@/components'

interface MediaKitHeroProps {
  badgeText?: string
  headline?: string
  subheadline?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

/**
 * Process headline text to convert [[text]] to gradient accent spans
 * Also handles line breaks (\n) and converts them to <br> tags
 */
function processGradientText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const regex = /\[\[([^\]]+)\]\]/g
  let lastIndex = 0
  let match
  let key = 0

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match (including handling line breaks)
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index)
      if (beforeText) {
        // Split by line breaks and add <br> tags
        const lines = beforeText.split('\n')
        lines.forEach((line, lineIndex) => {
          if (lineIndex > 0) {
            parts.push(<br key={`br-${key++}`} />)
          }
          if (line) {
            parts.push(line)
          }
        })
      }
    }

    // Add the gradient accent span
    parts.push(
      <span key={key++} className="gradient-accent">
        {match[1]}
      </span>
    )

    lastIndex = match.index + match[0].length
  }

  // Add remaining text (including handling line breaks)
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex)
    const lines = remainingText.split('\n')
    lines.forEach((line, lineIndex) => {
      if (lineIndex > 0) {
        parts.push(<br key={`br-${key++}`} />)
      }
      if (line) {
        parts.push(line)
      }
    })
  }

  return parts.length > 0 ? parts : [text]
}

export default function MediaKitHero({
  badgeText = 'RAULLINAITIS MEDIA KIT',
  headline = 'Get Your Brand Seen\n[[By The Right Audience]]',
  subheadline = 'Strategic content for AI, SaaS, and tech brands that naturally pulls in the right audience.',
  primaryButtonText = 'Partnership Rates',
  primaryButtonLink = '#',
  secondaryButtonText = 'See Case Studies',
  secondaryButtonLink = '#',
}: MediaKitHeroProps) {
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

  return (
    <SectionParallax className="ds-media-kit-hero-section" gridSpeed={0.5}>
      <div className="ds-media-kit-hero-container">
        {/* Badge */}
        {badgeText && (
          <Badge text={badgeText} variant="main" size="md" />
        )}

        {/* Hero Text */}
        {headline && (
          <h1 className="hero-headline">
            {processGradientText(headline)}
          </h1>
        )}

        {subheadline && (
          <p className="hero-subheadline">
            {subheadline}
          </p>
        )}

        {/* CTA Buttons */}
        {(primaryButtonText || secondaryButtonText) && (
          <div className="cta-buttons">
            {primaryButtonText && (
              <ButtonPrimary
                text={primaryButtonText}
                url={primaryButtonLink?.startsWith('#') ? undefined : primaryButtonLink}
                onClick={primaryButtonLink?.startsWith('#') ? () => handleLinkClick(primaryButtonLink) : undefined}
                size="md"
              />
            )}

            {secondaryButtonText && (
              <ButtonSecondary
                text={secondaryButtonText}
                url={secondaryButtonLink?.startsWith('#') ? undefined : secondaryButtonLink}
                onClick={secondaryButtonLink?.startsWith('#') ? () => handleLinkClick(secondaryButtonLink) : undefined}
                size="md"
              />
            )}
          </div>
        )}
      </div>
    </SectionParallax>
  )
}

