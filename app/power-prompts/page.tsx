/**
 * Power Prompts Sales Page
 * 
 * Sales page for the 1,500 Power Prompts Library
 * Follows Media Kit design principles
 */

'use client'

import FeaturesGrid from '@/components/FeaturesGrid'
import CtaBanner from '@/components/CtaBanner'
import MediaKitFAQ from '@/components/MediaKitFAQ'
import { ButtonPrimary, SectionTitle, SectionParallax } from '@/components'
import { BackToTop } from '@/components'
import React from 'react'

// Icon components for features
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PlugIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22v-5M9 9V6a3 3 0 0 1 6 0v3M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 2v4M8 2h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ProIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const TimeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ConfidenceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// FAQ data
const faqs = [
  {
    question: "Can't I just find free prompts online?",
    answer: "Free prompts are scattered and often outdated. The Power-Prompt Library is curated, tested, and organized for clarity and control. It's the difference between guessing and knowing exactly what to use.",
    defaultOpen: false,
  },
  {
    question: 'Do I need experience?',
    answer: 'The library works for both beginners and pros. Beginners get a clear starting point, while pros save time with tested prompts that avoid common mistakes.',
    defaultOpen: false,
  },
  {
    question: 'What if Nano Banana updates?',
    answer: 'Core use cases remain relevant regardless of updates. The library focuses on fundamental prompt patterns that work across versions.',
    defaultOpen: false,
  },
  {
    question: 'How do I access it?',
    answer: 'You get instant online access with searchable, downloadable prompts. It\'s yours forever — no subscriptions, no recurring fees.',
    defaultOpen: false,
  },
]

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

export default function PowerPromptsPage() {
  const handleLinkClick = (href: string) => {
    if (href?.startsWith('#')) {
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ block: 'start' })
      }
    }
  }

  // Benefits data - create icon elements as JSX inside component
  const benefits = [
    {
      title: 'Save hours',
      description: 'No more dead-end experiments',
      icon: <TimeIcon />,
    },
    {
      title: 'Get outputs that look pro',
      description: 'Prompts designed to avoid amateur errors',
      icon: <CheckIcon />,
    },
    {
      title: 'Always know the right starting point',
      description: 'Structured categories for every use case',
      icon: <TargetIcon />,
    },
    {
      title: 'Create with confidence',
      description: 'Tested prompts that deliver consistent results',
      icon: <ConfidenceIcon />,
    },
  ]

  return (
    <div className="ds-default-background">
      {/* Hero Section */}
      <SectionParallax className="ds-power-prompts-hero-section" gridSpeed={0.5}>
        <div className="ds-power-prompts-hero-container">
          <h1 className="ds-power-prompts-hero-headline">
            {processGradientText("Most People Use Nano Banana Wrong")}
          </h1>
          <p className="ds-power-prompts-hero-subheadline">
            Become a Nano Banana power user in minutes — free mini‑course below.
          </p>
          
          {/* Video Embed */}
          <div className="ds-power-prompts-hero-video">
            <div className="ds-power-prompts-hero-video-wrapper">
              <iframe
                src="https://cdn.shopify.com/videos/c/o/v/placeholder.mp4"
                title="Nano Banana Mini Course"
                className="ds-power-prompts-hero-video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Support Line + CTA */}
          <div className="ds-power-prompts-hero-cta-group">
            <p className="ds-power-prompts-hero-support-text">
              Then unlock the 1,500 Power Prompts designed to give you pro‑level results instantly.
            </p>
            <div className="ds-power-prompts-hero-cta">
              <ButtonPrimary
                text="👉 Get the Prompt Library ($20)"
                url="#offer"
                onClick={() => handleLinkClick('#offer')}
                size="lg"
              />
            </div>
          </div>
        </div>
      </SectionParallax>

      {/* Transition Section */}
      <SectionParallax className="ds-power-prompts-transition-section" gridSpeed={0.5}>
        <div className="ds-power-prompts-transition-container">
          <p className="ds-power-prompts-transition-text">
            Most users waste time with random prompts and get mid‑tier outputs. Power users know the right prompt at the right moment changes everything. That&apos;s why I built the Power‑Prompt Library…
          </p>
        </div>
      </SectionParallax>

      {/* Core Offer Section */}
      <SectionParallax id="offer" className="ds-power-prompts-offer-section" gridSpeed={0.5}>
        <div className="ds-power-prompts-offer-container">
          <SectionTitle>The 1,500‑Prompt Library — Built for Power Users</SectionTitle>
          <p className="ds-power-prompts-offer-subheader">
            Don&apos;t guess. Don&apos;t scroll wasted Discord threads. Use prompts curated for clarity and control.
          </p>

          <div className="ds-power-prompts-offer-grid">
            {/* Left Column: Bullet List */}
            <div className="ds-power-prompts-offer-features">
              <div className="ds-power-prompts-feature-item">
                <div className="ds-power-prompts-feature-icon">
                  <SearchIcon />
                </div>
                <div className="ds-power-prompts-feature-content">
                  <strong>Find fast</strong> → search & filter prompts instantly
                </div>
              </div>
              <div className="ds-power-prompts-feature-item">
                <div className="ds-power-prompts-feature-icon">
                  <TargetIcon />
                </div>
                <div className="ds-power-prompts-feature-content">
                  <strong>Targeted use cases</strong> → structured categories
                </div>
              </div>
              <div className="ds-power-prompts-feature-item">
                <div className="ds-power-prompts-feature-icon">
                  <PlugIcon />
                </div>
                <div className="ds-power-prompts-feature-content">
                  <strong>Plug & play</strong> → copy‑paste tested prompts
                </div>
              </div>
              <div className="ds-power-prompts-feature-item">
                <div className="ds-power-prompts-feature-icon">
                  <ProIcon />
                </div>
                <div className="ds-power-prompts-feature-content">
                  <strong>Pro‑level outputs</strong> → prompts designed to avoid &quot;amateur errors&quot;
                </div>
              </div>
            </div>

            {/* Right Column: Mockup Image */}
            <div className="ds-power-prompts-offer-image">
              <div className="ds-power-prompts-mockup-placeholder">
                <p>Library Preview</p>
              </div>
            </div>
          </div>

          <div className="ds-power-prompts-offer-cta">
            <ButtonPrimary
              text="Unlock the Power‑Prompt Library ($20)"
              url="#mid-cta"
              onClick={() => handleLinkClick('#mid-cta')}
              size="lg"
            />
          </div>
        </div>
      </SectionParallax>

      {/* Benefits Section */}
      <div className="ds-power-prompts-benefits-section">
        <div className="ds-power-prompts-benefits-container">
          <SectionTitle>Here&apos;s What Happens When You Shift From Casual to Power User</SectionTitle>
          <FeaturesGrid cards={benefits} className="ds-power-prompts-benefits-grid" />
        </div>
      </div>

      {/* Preview Section */}
      <SectionParallax className="ds-power-prompts-preview-section" gridSpeed={0.5}>
        <div className="ds-power-prompts-preview-container">
          <SectionTitle>See How Power Users Work</SectionTitle>
          <div className="ds-power-prompts-preview-image">
            <div className="ds-power-prompts-blurred-preview">
              <p>Prompt Categories Preview</p>
            </div>
          </div>
          <div className="ds-power-prompts-preview-cta">
            <ButtonPrimary
              text="Unlock All 1,500 Prompts ($20)"
              url="#mid-cta"
              onClick={() => handleLinkClick('#mid-cta')}
              size="lg"
            />
          </div>
        </div>
      </SectionParallax>

      {/* Trust Section */}
      <SectionParallax className="ds-power-prompts-trust-section" gridSpeed={0.5}>
        <div className="ds-power-prompts-trust-container">
          <SectionTitle>Why Listen to Me?</SectionTitle>
          <p className="ds-power-prompts-trust-text">
            I&apos;ve spent 10+ years creating content at a professional level… This isn&apos;t random scraps — it&apos;s a power‑user system.
          </p>
        </div>
      </SectionParallax>

      {/* Mid-Page CTA */}
      <div id="mid-cta">
        <CtaBanner
          headline="Become a Power User — For Just $20"
          subheadline="Instant online access. Searchable. Downloadable. Yours forever."
          buttonText="Unlock the 1,500 Power Prompts"
          buttonLink="#final-cta"
          price="$20"
        />
      </div>

      {/* FAQ Section */}
      <SectionParallax className="ds-power-prompts-faq-section" gridSpeed={0.5}>
        <div className="ds-power-prompts-faq-container">
          <MediaKitFAQ faqs={faqs} />
        </div>
      </SectionParallax>

      {/* Final CTA */}
      <div id="final-cta">
        <CtaBanner
          headline="Every minute you spend with random prompts keeps you stuck in 'casual mode'."
          subheadline="Become a Nano Banana Power User today — unlock the 1,500‑Prompt Library for just $20."
          buttonText="🔥 Get the Library Now"
          buttonLink="#"
          price="$20"
        />
      </div>

      <BackToTop />
    </div>
  )
}

