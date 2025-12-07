/**
 * Authority Bio Component
 * 
 * Image with text bio section showing authority/credibility
 */

'use client'
/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { SectionTitle } from '@/components'

interface AuthorityBioProps {
  headline?: string
  body?: string
  imageUrl?: string
  imageAlt?: string
  trustBadges?: string[]
  imageVariant?: 'circle' | 'square'
  className?: string
}

export default function AuthorityBio({
  headline,
  body,
  imageUrl,
  imageAlt = 'Authority figure',
  trustBadges = [],
  imageVariant = 'circle',
  className = '',
}: AuthorityBioProps) {
  return (
    <section className={`ds-authority-bio-section ${className}`}>
      <div className="ds-authority-bio-container">
        <div className="ds-authority-bio-card">
          {headline && (
            <h2 className="ds-authority-bio-headline">{headline}</h2>
          )}

          <div className="ds-authority-bio-content">
          {imageUrl && (
            <div className={`ds-authority-bio-image-wrapper ds-authority-bio-image--${imageVariant}`}>
              <img
                src={imageUrl}
                alt={imageAlt}
                className="ds-authority-bio-image"
              />
            </div>
          )}

          <div className="ds-authority-bio-text">
            {body && (
              <div className="ds-authority-bio-body">
                {body.split('\n').map((paragraph, index) => (
                  <p key={index} className="ds-authority-bio-paragraph">
                    {paragraph.split('**').map((part, partIndex) => 
                      partIndex % 2 === 1 ? (
                        <strong key={partIndex}>{part}</strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                ))}
              </div>
            )}

            {trustBadges.length > 0 && (
              <div className="ds-authority-bio-badges">
                {trustBadges.map((badge, index) => (
                  <span key={index} className="ds-authority-bio-badge">
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

