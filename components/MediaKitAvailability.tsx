/**
 * Media Kit Availability Component
 * 
 * Converted from Shopify Liquid section to React/Next.js
 * Displays availability cards with slot counts
 */

'use client'

import React from 'react'
import { ButtonPrimary, Card, SectionTitle, SectionParallax } from '@/components'

interface AvailabilityMonth {
  month: string
  slotsAvailable: number
  isOpen: boolean
}

interface MediaKitAvailabilityProps {
  sectionTitle?: string
  sectionDescription?: string
  buttonText?: string
  buttonLink?: string
  months?: AvailabilityMonth[]
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

export default function MediaKitAvailability({
  sectionTitle = 'Limited Collabs Availability',
  sectionDescription = 'I work with 4 to 6 brands each month to keep every campaign unique, well-focused, and aligned with audience insight.',
  buttonText = 'Reserve Your Collaboration Slot',
  buttonLink = '#contact-section',
  months = [],
}: MediaKitAvailabilityProps) {

  return (
    <SectionParallax className="ds-media-kit-availability-section" gridSpeed={0.5}>
      <div className="ds-media-kit-availability-container">
        {/* Section Header */}
        {sectionTitle && (
          <SectionTitle>{sectionTitle}</SectionTitle>
        )}

        {sectionDescription && (
          <p className="section-description">
            {sectionDescription}
          </p>
        )}

        {/* Availability Cards */}
        {months.length > 0 && (
          <div className="availability-grid">
            {months.map((month, index) => (
              <AvailabilityCard
                key={index}
                month={month}
              />
            ))}
          </div>
        )}

        {/* CTA Button */}
        {buttonText && (
          <div className="availability-cta-wrapper">
            <ButtonPrimary
              text={buttonText}
              url={buttonLink?.startsWith('#') ? undefined : buttonLink}
              onClick={buttonLink?.startsWith('#') ? () => handleLinkClick(buttonLink) : undefined}
              size="md"
            />
          </div>
        )}
      </div>
    </SectionParallax>
  )
}

// Availability Card Component
interface AvailabilityCardProps {
  month: AvailabilityMonth
}

function AvailabilityCard({ month }: AvailabilityCardProps) {
  return (
    <Card className={`availability-card ${month.isOpen ? 'available' : ''}`} hover>
      <h3 className="availability-month">{month.month}</h3>
      <div className="availability-number">{month.slotsAvailable}</div>
      <p className="availability-slots">
        {month.slotsAvailable > 0 ? (
          month.slotsAvailable === 1 ? 'slot left' : 'slots left'
        ) : (
          'Not Yet Open'
        )}
      </p>
      <div className={`status-bar ${month.isOpen ? 'open' : 'closed'}`}>
        <span className={`status-dot ${month.isOpen ? 'open' : 'closed'}`}></span>
        <span>{month.isOpen ? 'OPEN' : 'CLOSED'}</span>
      </div>
    </Card>
  )
}















