/**
 * ProductCard Component
 * 
 * Converted from snippets/ds-card-product.liquid
 * Product card for e-commerce displays
 */

'use client'

import React, { useEffect, useRef, useId } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ButtonPrimary } from './ButtonPrimary'
import { Badge } from './Badge'

export interface ProductCardProps {
  /** Product data */
  product: {
    title: string
    price: number
    compareAtPrice?: number
    featuredMedia?: string
    url: string
    available?: boolean
    vendor?: string
    rating?: number
    ratingCount?: number
  }
  /** Display product vendor name */
  showVendor?: boolean
  /** Display star rating */
  showRating?: boolean
  /** Display sale/sold out badges */
  showBadge?: boolean
  /** CTA button text */
  buttonText?: string
  /** Image aspect ratio */
  imageAspectRatio?: '1/1' | '4/3' | '16/9'
  /** Enable hover lift and glow effects */
  hover?: boolean
  /** Additional CSS classes */
  className?: string
}

export function ProductCard({
  product,
  showVendor = false,
  showRating = false,
  showBadge = true,
  buttonText = 'View Product',
  imageAspectRatio = '1/1',
  hover = true,
  className = '',
}: ProductCardProps) {
  const classes = [
    'ds-product-card',
    hover ? 'ds-card--hover' : '',
    className
  ].filter(Boolean).join(' ')
  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price
  const isSoldOut = product.available === false
  const ratingRef = useRef<HTMLDivElement>(null)
  
  // Unique gradient ID for this component instance (stable across server/client)
  const gradientId = `product-rating-gradient-${useId()}`

  useEffect(() => {
    // Apply gradient stroke to outlined stars and fill to filled stars
    // Use setTimeout to ensure DOM is fully ready and gradient SVG is in the document
    const timer = setTimeout(() => {
      if (ratingRef.current) {
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
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [gradientId, product.rating])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100)
  }

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
      
      <div className="product-image-wrapper" style={{ aspectRatio: imageAspectRatio }}>
        {showBadge && (
          <div className="badge-container">
            {isSoldOut ? (
              <Badge text="Sold Out" variant="secondary" size="sm" />
            ) : isOnSale ? (
              <Badge text="Sale" variant="attention" size="sm" />
            ) : null}
          </div>
        )}
        {product.featuredMedia && (
          <Image
            src={product.featuredMedia}
            alt={product.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="product-info">
        {showVendor && product.vendor && (
          <p className="product-vendor">{product.vendor}</p>
        )}
        <h3 className="product-title">
          <Link href={product.url}>{product.title}</Link>
        </h3>
        {showRating && product.rating && (
          <div className="rating" ref={ratingRef}>
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className={`star ${i <= product.rating! ? 'star-filled' : 'star-empty'}`}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {i <= product.rating! ? (
                  <path d="M8 0l2.5 5.5L16 6.6l-4 4.4.9 5.9L8 13.5l-4.9 3.4.9-5.9L0 6.6l5.5-.1L8 0z" />
                ) : (
                  <path
                    d="M8 0l2.5 5.5L16 6.6l-4 4.4.9 5.9L8 13.5l-4.9 3.4.9-5.9L0 6.6l5.5-.1L8 0z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                )}
              </svg>
            ))}
            {product.ratingCount && (
              <span className="rating-count">({product.ratingCount})</span>
            )}
          </div>
        )}
        <div className="product-price-container">
          <span className="product-price">{formatPrice(product.price)}</span>
          {isOnSale && product.compareAtPrice && (
            <span className="product-compare-price">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <ButtonPrimary text={buttonText} url={product.url} size="sm" />
      </div>
    </div>
  )
}

