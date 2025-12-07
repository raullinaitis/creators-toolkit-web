/**
 * CardTestimonial Component
 * 
 * Converted from snippets/ds-card-testimonial.liquid
 * Testimonial card with quote, author, and optional avatar and rating
 */

'use client'
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useId } from 'react'

export interface CardTestimonialProps {
  /** Testimonial quote text */
  quote: string
  /** Author name */
  author: string
  /** Author role/title */
  role?: string
  /** Avatar image URL */
  avatarUrl?: string
  /** Star rating (1-5) */
  rating?: number
  /** Enable hover lift and glow effects */
  hover?: boolean
  /** Additional CSS classes */
  className?: string
}

export function CardTestimonial({
  quote,
  author,
  role,
  avatarUrl,
  rating,
  hover = true,
  className = '',
}: CardTestimonialProps) {
  const classes = [
    'ds-card-testimonial',
    hover ? 'ds-card--hover' : '',
    className
  ].filter(Boolean).join(' ')
  const ratingRef = useRef<HTMLDivElement>(null)
  
  // Unique gradient ID for this component instance (stable across server/client)
  const gradientId = `rating-gradient-${useId()}`

  useEffect(() => {
    // Apply gradient stroke to outlined stars and fill to filled stars
    // Use setTimeout to ensure DOM is fully ready and gradient SVG is in the document
    const timer = setTimeout(() => {
      if (ratingRef.current) {
        // Apply gradient stroke to empty stars (outlined stars) - matching ProductCard
        const emptyStars = ratingRef.current.querySelectorAll('.star-empty')
        emptyStars.forEach((star) => {
          const svg = star as SVGElement
          // Apply gradient to the SVG element
          svg.setAttribute('stroke', `url(#${gradientId})`)
          svg.setAttribute('fill', 'none')
          // Also apply to path elements inside (they have stroke="currentColor" which needs to be overridden)
          const paths = svg.querySelectorAll('path')
          paths.forEach((path) => {
            path.setAttribute('stroke', `url(#${gradientId})`)
            path.setAttribute('fill', 'none')
            path.removeAttribute('stroke-width') // Remove if present to use default
          })
        })
        
        // Apply gradient fill to filled stars
        const filledStars = ratingRef.current.querySelectorAll('.star-filled')
        filledStars.forEach((star) => {
          const svg = star as SVGElement
          svg.setAttribute('fill', `url(#${gradientId})`)
          svg.removeAttribute('stroke')
          // Also apply to path elements inside
          const paths = svg.querySelectorAll('path')
          paths.forEach((path) => {
            path.setAttribute('fill', `url(#${gradientId})`)
            path.removeAttribute('stroke')
          })
        })
        
        // Apply gradient fill to half stars (first path is the filled half with clipPath)
        const halfStars = ratingRef.current.querySelectorAll('.star-half')
        halfStars.forEach((star) => {
          const paths = star.querySelectorAll('path')
          if (paths.length >= 1) {
            // First path is the filled half (clipped)
            paths[0].setAttribute('fill', `url(#${gradientId})`)
            paths[0].removeAttribute('stroke')
          }
          // Second path is the outline - apply gradient stroke
          if (paths.length >= 2) {
            paths[1].setAttribute('stroke', `url(#${gradientId})`)
            paths[1].setAttribute('fill', 'none')
          }
        })
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [gradientId, rating])

  return (
    <div className={classes}>
      {/* Gradient definition - rendered once per component instance */}
      <svg style={{ position: 'absolute', width: 0, height: 0, visibility: 'hidden' }} aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--master-accent-primary)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'var(--master-accent-secondary)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      
      {rating && (
        <div className="rating" ref={ratingRef}>
          {[1, 2, 3, 4, 5].map((i) => {
            const isHalfStar = rating >= i - 0.5 && rating < i
            const isFilled = rating >= i
            
            return (
              <svg
                key={i}
                className={`star ${isFilled ? 'star-filled' : isHalfStar ? 'star-half' : 'star-empty'}`}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {isFilled ? (
                  <path d="M8 0l2.5 5.5L16 6.6l-4 4.4.9 5.9L8 13.5l-4.9 3.4.9-5.9L0 6.6l5.5-.1L8 0z" />
                ) : isHalfStar ? (
                  <>
                    <defs>
                      <clipPath id={`half-star-${i}-${gradientId}`}>
                        <rect x="0" y="0" width="8" height="16" />
                      </clipPath>
                    </defs>
                    <path 
                      d="M8 0l2.5 5.5L16 6.6l-4 4.4.9 5.9L8 13.5l-4.9 3.4.9-5.9L0 6.6l5.5-.1L8 0z" 
                      clipPath={`url(#half-star-${i}-${gradientId})`}
                    />
                    <path
                      d="M8 0l2.5 5.5L16 6.6l-4 4.4.9 5.9L8 13.5l-4.9 3.4.9-5.9L0 6.6l5.5-.1L8 0z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </>
                ) : (
                  <path
                    d="M8 0l2.5 5.5L16 6.6l-4 4.4.9 5.9L8 13.5l-4.9 3.4.9-5.9L0 6.6l5.5-.1L8 0z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                )}
              </svg>
            )
          })}
        </div>
      )}

      <blockquote>{quote}</blockquote>

      <div className="author-section">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={`${author} avatar`}
            className="avatar"
            width={48}
            height={48}
          />
        ) : (
          <div className="avatar avatar-placeholder">
            <span className="avatar-initials">{author.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <div>
          <p className="author-name">{author}</p>
          {role && <p className="author-role">{role}</p>}
        </div>
      </div>
    </div>
  )
}

