/**
 * Features Grid Component
 * 
 * Grid of feature cards with icons, titles, and descriptions
 */

'use client'

import React from 'react'
import { CardFeature } from '@/components'
import { SectionTitle } from '@/components'

interface FeatureCard {
  title: string
  description: string
  icon: React.ReactNode | (() => React.ReactNode)
}

interface FeaturesGridProps {
  title?: string
  cards?: FeatureCard[]
  className?: string
}

// SVG Icons for the features
const CreateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const StyleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const TimeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const PolishIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const InpaintIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const UseCasesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export default function FeaturesGrid({
  title,
  cards = [],
  className = '',
}: FeaturesGridProps) {
  return (
    <section className={`ds-features-grid-section ${className}`}>
      <div className="ds-features-grid-container">
        {title && (
          <SectionTitle>{title}</SectionTitle>
        )}

        {cards.length > 0 && (
          <div className="ds-features-grid">
            {cards.map((card, index) => {
              const iconElement: React.ReactNode = typeof card.icon === 'function' 
                ? card.icon() 
                : card.icon
              
              return (
                <CardFeature
                  key={index}
                  iconSvg={iconElement}
                  title={card.title}
                  text={card.description}
                  hover={true}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

// Export icon components for use in page
export { CreateIcon, StyleIcon, TimeIcon, PolishIcon, InpaintIcon, UseCasesIcon }

