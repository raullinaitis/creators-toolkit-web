/**
 * Hero Sales Component
 * 
 * Sales-focused hero section with video, pricing, and CTA
 * Split layout on desktop, stacked on mobile
 */

'use client'

import React from 'react'
import { ButtonPrimary, Badge } from '@/components'

/**
 * Process headline text to convert [[text]] to gradient accent spans
 * Also handles line breaks (\n) and converts them to <br> tags
 * Collapses multiple consecutive line breaks into a single break
 */
function processGradientText(text: string): React.ReactNode[] {
  // Normalize line breaks: handle both actual \n and literal "\n" strings
  const normalizedText = text.replace(/\\n/g, '\n')
  
  const parts: React.ReactNode[] = []
  const regex = /\[\[([^\]]+)\]\]/g
  let lastIndex = 0
  let match
  let key = 0

  // Helper function to process text segments with line breaks
  const processTextSegment = (segment: string, hasContentBefore: boolean): boolean => {
    if (!segment) return hasContentBefore
    
    const lines = segment.split('\n')
    let needsBreak = hasContentBefore
    let segmentHasContent = false
    
    for (const line of lines) {
      if (line.trim()) {
        // Non-empty line: add break if needed, then add the line
        if (needsBreak) {
          parts.push(<br key={`br-${key++}`} />)
          needsBreak = false
        }
        parts.push(line)
        segmentHasContent = true
      } else {
        // Empty line: mark that we need a break (but only once per group of empty lines)
        if ((hasContentBefore || segmentHasContent) && !needsBreak) {
          needsBreak = true
        }
      }
    }
    
    return hasContentBefore || segmentHasContent
  }

  let hasContentBefore = false

  while ((match = regex.exec(normalizedText)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      const beforeText = normalizedText.substring(lastIndex, match.index)
      hasContentBefore = processTextSegment(beforeText, hasContentBefore)
    }

    // Add the gradient accent span
    parts.push(
      <span key={key++} className="gradient-accent">
        {match[1]}
      </span>
    )
    hasContentBefore = true

    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < normalizedText.length) {
    const remainingText = normalizedText.substring(lastIndex)
    processTextSegment(remainingText, hasContentBefore)
  }

  // If no matches found, process the entire text
  if (parts.length === 0) {
    processTextSegment(normalizedText, false)
  }

  return parts.length > 0 ? parts : [text]
}

interface HeroSalesProps {
  eyebrowTag?: string
  headline?: string
  subheadline?: string
  videoHeader?: string
  videoUrl?: string
  priceAnchor?: string
  priceActual?: string
  buttonText?: string
  buttonLink?: string
  microCopy?: string
  className?: string
}

export default function HeroSales({
  eyebrowTag,
  headline,
  subheadline,
  videoHeader,
  videoUrl,
  priceAnchor,
  priceActual,
  buttonText,
  buttonLink,
  microCopy,
  className = '',
}: HeroSalesProps) {
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
    <section className={`ds-hero-sales-section ${className}`}>
      <div className="ds-hero-sales-container">
        {/* Left Column: Text Content */}
        <div className="ds-hero-sales-content">
          {eyebrowTag && (
            <Badge text={eyebrowTag} variant="main" size="md" />
          )}

          {headline && (
            <h1 className="ds-hero-sales-headline">
              {processGradientText(headline)}
            </h1>
          )}

          {subheadline && (
            <p className="ds-hero-sales-subheadline">
              {processGradientText(subheadline)}
            </p>
          )}

          {/* Micro Copy */}
          {microCopy && (
            <p className="ds-hero-sales-micro-copy">
              {microCopy}
            </p>
          )}

          {/* Video Header */}
          {videoHeader && (
            <p className="ds-hero-sales-video-header">
              {videoHeader}
            </p>
          )}

          {/* Video Section */}
          {videoUrl && (
            <div className="ds-hero-sales-media">
              <div className="ds-hero-sales-video-wrapper">
                <iframe
                  src={videoUrl}
                  title="Masterclass Video"
                  className="ds-hero-sales-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Pricing */}
          {(priceAnchor || priceActual) && (
            <div className="ds-hero-sales-pricing">
              {priceAnchor && (
                <span className="ds-hero-sales-price-anchor">
                  {priceAnchor}
                </span>
              )}
              {priceActual && (
                <span className="ds-hero-sales-price-actual">
                  {priceActual}
                </span>
              )}
            </div>
          )}

          {/* CTA Button */}
          {buttonText && (
            <div className="ds-hero-sales-cta">
              <ButtonPrimary
                text={buttonText}
                url={buttonLink?.startsWith('#') ? undefined : buttonLink}
                onClick={buttonLink?.startsWith('#') ? () => handleLinkClick(buttonLink) : undefined}
                size="lg"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}



