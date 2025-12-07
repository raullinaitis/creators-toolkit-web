/**
 * Media Kit Case Studies Component
 * 
 * Converted from Shopify Liquid section to React/Next.js
 * Displays a grid of case study cards with images/videos
 */

'use client'
/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { Card, SectionTitle, SectionParallax } from '@/components'

interface CaseStudy {
  id: string
  brandName: string
  brandSubtitle?: string
  description: string
  goal?: string
  result?: string
  views: string
  caseImage?: string
  caseVideo?: string
}

interface MediaKitCaseStudiesProps {
  sectionTitle?: string
  sectionDescription?: string
  caseStudies?: CaseStudy[]
}


export default function MediaKitCaseStudies({
  sectionTitle = 'Campaigns That Delivered',
  sectionDescription = 'Real campaigns that built recognition and community through authentic, shareable storytelling.',
  caseStudies = [],
}: MediaKitCaseStudiesProps) {

  return (
    <SectionParallax id="results-section" className="ds-media-kit-case-studies-section" gridSpeed={0.5}>
      <div className="ds-media-kit-case-studies-container">
        {/* Section Header */}
        {sectionTitle && (
          <SectionTitle>{sectionTitle}</SectionTitle>
        )}

        {sectionDescription && (
          <p className="section-description">
            {sectionDescription}
          </p>
        )}

        {/* Case Study Cards */}
        {caseStudies.length > 0 && (
          <div className="results-grid">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard
                key={caseStudy.id}
                caseStudy={caseStudy}
              />
            ))}
          </div>
        )}
      </div>
    </SectionParallax>
  )
}

// Case Study Card Component
interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Card className="case-card" hover>
      {/* Case Image/Video */}
      <div className="case-image">
        {caseStudy.caseVideo ? (
          <video
            src={caseStudy.caseVideo}
            playsInline
            muted
            loop
            autoPlay
            preload="metadata"
            aria-label={`${caseStudy.brandName} case study video`}
          />
        ) : caseStudy.caseImage ? (
          <img
            src={caseStudy.caseImage}
            alt={caseStudy.brandName}
            width={500}
            height={889}
            loading="lazy"
          />
        ) : (
          <div className="case-image-placeholder">
            9:16 Video/Image
          </div>
        )}
      </div>

      {/* Case Content */}
      <div className="case-content">
        <h3 className="case-brand">{caseStudy.brandName}</h3>
        {caseStudy.brandSubtitle && (
          <p className="case-brand-subtitle">{caseStudy.brandSubtitle}</p>
        )}
        <p className="case-description">{caseStudy.description}</p>

        <span className="case-views">{caseStudy.views}</span>
      </div>
    </Card>
  )
}















