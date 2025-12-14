/**
 * Prompt Pack Hero Component
 * 
 * Custom hero section for Nano Banana Pro Prompt Pack page
 * Layout: Badge → Headline → Subheadline → Video Header → Video Embed → CTA Button
 */

'use client'

import React from 'react'
import { ButtonPrimary, Badge, SectionParallax } from '@/components'

interface PromptPackHeroProps {
  eyebrowText?: string
  headline?: string
  subheadline?: string
  videoHeader?: string
  videoEmbedUrl?: string
  buttonText?: string
  buttonLink?: string
}

/**
 * Convert YouTube URL to embed format
 * Handles:
 * - Short URLs: https://youtu.be/VIDEO_ID
 * - Regular URLs: https://www.youtube.com/watch?v=VIDEO_ID
 * - Embed URLs: https://www.youtube.com/embed/VIDEO_ID (returns as-is)
 */
function convertToYouTubeEmbed(url: string): string {
  if (!url) return url
  
  // If already an embed URL, return as-is
  if (url.includes('youtube.com/embed/')) {
    return url
  }
  
  // Extract video ID from short URL (youtu.be/VIDEO_ID)
  const shortUrlMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortUrlMatch) {
    return `https://www.youtube.com/embed/${shortUrlMatch[1]}`
  }
  
  // Extract video ID from regular URL (youtube.com/watch?v=VIDEO_ID)
  const regularUrlMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (regularUrlMatch) {
    return `https://www.youtube.com/embed/${regularUrlMatch[1]}`
  }
  
  // If no match, return original URL
  return url
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
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index)
      if (beforeText) {
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

    parts.push(
      <span key={key++} className="gradient-accent">
        {match[1]}
      </span>
    )

    lastIndex = match.index + match[0].length
  }

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

export default function PromptPackHero({
  eyebrowText = '⚡ Optimized for Nano Banana (Gemini Flash)',
  headline = 'Stop Gambling with Generative AI.\nTake Total Visual Control.',
  subheadline = 'Stop hoping for a lucky result. Watch the free masterclass below to learn the workflow, then unlock the system that gives you pro-level results every time.',
  videoHeader, // No default value
  videoEmbedUrl,
  buttonText = 'Get the Dashboard ($19)',
  buttonLink = '#pricing',
}: PromptPackHeroProps) {
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
    <SectionParallax className="ds-prompt-pack-hero-section" gridSpeed={0.5}>
      <div className="ds-prompt-pack-hero-container">
        {/* Eyebrow Badge */}
        {eyebrowText && (
          <Badge text={eyebrowText} variant="main" size="md" />
        )}

        {/* Headline */}
        {headline && (
          <h1 className="ds-prompt-pack-hero-headline">
            {processGradientText(headline)}
          </h1>
        )}

        {/* Subheadline */}
        {subheadline && (
          <p className="ds-prompt-pack-hero-subheadline">
            {subheadline}
          </p>
        )}

        {/* Video Header */}
        {videoHeader && (
          <div className="ds-prompt-pack-hero-video-header">
            {videoHeader}
          </div>
        )}

        {/* Video Embed */}
        <div className="ds-prompt-pack-hero-video-wrapper">
          {videoEmbedUrl ? (
            <div className="ds-prompt-pack-hero-video-embed">
              <iframe
                src={convertToYouTubeEmbed(videoEmbedUrl)}
                title="Masterclass Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="ds-prompt-pack-hero-video-iframe"
              />
            </div>
          ) : (
            <div className="ds-prompt-pack-hero-video-placeholder">
              VIDEO EMBED GOES HERE
            </div>
          )}
        </div>

        {/* CTA Button */}
        {buttonText && (
          <div className="ds-prompt-pack-hero-cta">
            <ButtonPrimary
              text={buttonText}
              url={buttonLink?.startsWith('#') ? undefined : buttonLink}
              onClick={buttonLink?.startsWith('#') ? () => handleLinkClick(buttonLink) : undefined}
              size="lg"
            />
          </div>
        )}
      </div>
    </SectionParallax>
  )
}
