/**
 * Media Kit FAQ Component
 * 
 * Converted from Shopify Liquid section to React/Next.js
 * Accordion-style FAQ section
 */

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { SectionTitle, SectionParallax } from '@/components'

interface FAQItem {
  question: string
  answer: string
  defaultOpen?: boolean
}

interface MediaKitFAQProps {
  sectionTitle?: string
  sectionDescription?: string
  faqs?: FAQItem[]
}


export default function MediaKitFAQ({
  sectionTitle = 'F.A.Q.',
  sectionDescription = 'Everything you need to know about how brand collaborations work.',
  faqs = [],
}: MediaKitFAQProps) {

  return (
    <SectionParallax className="ds-media-kit-faq-section" gridSpeed={0.5}>
      <div className="ds-media-kit-faq-container">
        {/* Section Header */}
        {sectionTitle && (
          <SectionTitle>{sectionTitle}</SectionTitle>
        )}

        {sectionDescription && (
          <p className="section-description">
            {sectionDescription}
          </p>
        )}

        {/* FAQ Accordion */}
        {faqs.length > 0 && (
          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
              />
            ))}
          </div>
        )}
      </div>
    </SectionParallax>
  )
}

// FAQ Item Component
interface FAQItemProps {
  faq: FAQItem
}

function FAQItem({ faq }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(faq.defaultOpen || false)
  const answerRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    if (answerRef.current && detailsRef.current) {
      // Initialize state based on defaultOpen
      const shouldBeOpen = faq.defaultOpen || false
      if (shouldBeOpen) {
        detailsRef.current.setAttribute('open', 'open')
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
          if (answerRef.current) {
            answerRef.current.style.maxHeight = answerRef.current.scrollHeight + 'px'
          }
        }, 0)
      } else {
        detailsRef.current.removeAttribute('open')
        if (answerRef.current) {
          answerRef.current.style.maxHeight = '0px'
        }
      }
      setIsOpen(shouldBeOpen)
    }
  }, [faq.defaultOpen])

  useEffect(() => {
    if (answerRef.current && detailsRef.current) {
      if (isOpen) {
        detailsRef.current.setAttribute('open', 'open')
        // Use setTimeout to ensure scrollHeight is calculated correctly
        setTimeout(() => {
          if (answerRef.current) {
            answerRef.current.style.maxHeight = answerRef.current.scrollHeight + 'px'
          }
        }, 0)
      } else {
        detailsRef.current.removeAttribute('open')
        if (answerRef.current) {
          answerRef.current.style.maxHeight = '0px'
        }
      }
    }
  }, [isOpen])

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    
    const newIsOpen = !isOpen
    
    // Close all other FAQ items (compact accordion behavior)
    const allDetails = document.querySelectorAll('.faq-accordion details')
    allDetails.forEach((otherDetails) => {
      if (otherDetails !== detailsRef.current) {
        const otherDetailsElement = otherDetails as HTMLDetailsElement
        const otherAnswer = otherDetailsElement.querySelector('.faq-answer') as HTMLDivElement
        if (otherAnswer) {
          otherDetailsElement.removeAttribute('open')
          otherAnswer.style.maxHeight = '0px'
        }
      }
    })

    setIsOpen(newIsOpen)
  }

  return (
    <div>
      <details ref={detailsRef} className="ds-minimal-card ds-card--hover faq-item">
        <summary onClick={handleToggle}>{faq.question}</summary>
        <div ref={answerRef} className="faq-answer">
          <p>{faq.answer}</p>
        </div>
      </details>
    </div>
  )
}

