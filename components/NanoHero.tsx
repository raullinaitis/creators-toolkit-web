'use client'
import React from 'react'
import { SectionParallax, ButtonPrimary, Badge } from '@/components'

interface NanoHeroProps {
  // Extend for future props
}

export default function NanoHero({}: NanoHeroProps) {
  const handleScroll = (href: string) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ block: 'start' })
    }
  }

  return (
    <SectionParallax className="ds-nano-hero-section" gridSpeed={0.5}>
      <div className="ds-nano-hero-container">
        <Badge text="⚡ Optimized for Nano Banana (Gemini Flash)" variant="accent" size="md" />
        <h1 className="ds-nano-hero-headline">
          Stop Gambling with Generative AI.<br />
          <span className="gradient-accent">Take Total Visual Control.</span>
        </h1>
        <p className="ds-nano-hero-subheadline">
          Stop hoping for a lucky result. Watch the free masterclass below to learn the workflow, then unlock the system that gives you pro-level results every time.
        </p>
        <div className="ds-nano-hero-video-header">📺 Free Masterclass: From "Random" to "Cinematic"</div>
        <div className="ds-nano-hero-video-wrapper">
          {/* VIDEO EMBED PLACEHOLDER - replace with actual iframe */}
          <div className="ds-nano-hero-video-placeholder">VIDEO EMBED GOES HERE</div>
        </div>
        <div className="ds-nano-hero-cta">
          <ButtonPrimary 
            text="Get the Dashboard ($19)" 
            url="#pricing" 
            onClick={() => handleScroll('#pricing')}
            size="lg" 
          />
          <p className="ds-nano-hero-micro-copy">Instant Access • Searchable Library • Not a PDF</p>
        </div>
      </div>
    </SectionParallax>
  )
}