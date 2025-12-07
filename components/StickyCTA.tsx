/**
 * Sticky CTA Component
 *
 * Fixed bottom bar that appears after scrolling past hero section
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ButtonPrimary } from '@/components'

interface StickyCTAProps {
  text?: string
  price?: string
  buttonText?: string
  buttonLink?: string
  triggerElement?: string // CSS selector for element to trigger after
  className?: string
}

export default function StickyCTA({
  text = "Unlock Toolkit",
  price = "$19",
  buttonText = "Get Access Now",
  buttonLink = "#checkout",
  triggerElement = ".ds-hero-sales-section",
  className = '',
}: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHiding, setIsHiding] = useState(false)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isVisibleRef = useRef(false)
  const isHidingRef = useRef(false)

  useEffect(() => {
    isVisibleRef.current = isVisible
    isHidingRef.current = isHiding
  }, [isVisible, isHiding])

  useEffect(() => {
    const handleScroll = () => {
      const triggerElementNode = document.querySelector(triggerElement)
      const footerElement = document.querySelector('.ds-footer')
      
      if (triggerElementNode && footerElement) {
        const triggerBottom = triggerElementNode.getBoundingClientRect().bottom
        const footerRect = footerElement.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const scrollY = window.scrollY || window.pageYOffset
        const documentHeight = document.documentElement.scrollHeight
        
        // Show when trigger element is scrolled past
        const pastTrigger = triggerBottom < 0
        
        // Hide when footer is visible or when near bottom of page
        // Method 1: Check if footer is in viewport
        const footerInViewport = footerRect.top < viewportHeight
        
        // Method 2: Check if we're near the bottom of the document (within 300px)
        const nearBottom = scrollY + viewportHeight >= documentHeight - 300
        
        const shouldShow = pastTrigger && !footerInViewport && !nearBottom
        
        if (shouldShow) {
          // Clear any pending hide timeout
          if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current)
            hideTimeoutRef.current = null
          }
          // Starting to show
          if (!isVisibleRef.current) {
            setIsHiding(false)
            setIsVisible(true)
          }
        } else {
          // Starting to hide - trigger exit animation
          if (isVisibleRef.current && !isHidingRef.current) {
            setIsHiding(true)
            // Remove from DOM after animation completes
            hideTimeoutRef.current = setTimeout(() => {
              setIsVisible(false)
              setIsHiding(false)
            }, 300) // Match animation duration
          }
        }
      } else if (triggerElementNode) {
        // Fallback if footer doesn't exist
        const triggerBottom = triggerElementNode.getBoundingClientRect().bottom
        const shouldShow = triggerBottom < 0
        if (shouldShow) {
          if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current)
            hideTimeoutRef.current = null
          }
          if (!isVisibleRef.current) {
            setIsHiding(false)
            setIsVisible(true)
          }
        } else {
          if (isVisibleRef.current && !isHidingRef.current) {
            setIsHiding(true)
            hideTimeoutRef.current = setTimeout(() => {
              setIsVisible(false)
              setIsHiding(false)
            }, 300)
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [triggerElement])

  const handleLinkClick = (href: string) => {
    if (href?.startsWith('#')) {
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ block: 'start' })
      }
    }
  }

  if (!isVisible) return null

  return (
    <div className={`ds-sticky-cta ${isHiding ? 'ds-sticky-cta-hiding' : ''} ${className}`}>
      <div className="ds-sticky-cta-container">
        <div className="ds-sticky-cta-content">
          <div className="ds-sticky-cta-text">
            <span className="ds-sticky-cta-main-text">{text}</span>
            <span className="ds-sticky-cta-price">{price}</span>
          </div>
          <div className="ds-sticky-cta-button">
            <ButtonPrimary
              text={buttonText}
              url={buttonLink?.startsWith('#') ? undefined : buttonLink}
              onClick={buttonLink?.startsWith('#') ? () => handleLinkClick(buttonLink) : undefined}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
