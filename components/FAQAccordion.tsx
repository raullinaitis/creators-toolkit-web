/**
 * FAQ Accordion Component
 * 
 * Accordion-style FAQ section with question/answer pairs
 */

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { SectionTitle } from '@/components'

interface FAQItem {
  question: string
  answer: string
  defaultOpen?: boolean
}

interface FAQAccordionProps {
  sectionTitle?: string
  sectionDescription?: string
  items?: FAQItem[]
  variant?: 'default' | 'media-kit'
  className?: string
}

function FAQItem({ faq, variant = 'default' }: { faq: FAQItem; variant?: 'default' | 'media-kit' }) {
  const [isOpen, setIsOpen] = useState(faq.defaultOpen || false)
  const answerRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    if (answerRef.current && detailsRef.current) {
      const shouldBeOpen = faq.defaultOpen || false
      if (shouldBeOpen) {
        detailsRef.current.setAttribute('open', 'open')
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
    const selector = variant === 'media-kit' ? '.faq-accordion details' : '.ds-faq-accordion details'
    const answerClass = variant === 'media-kit' ? '.faq-answer' : '.ds-faq-answer'
    const allDetails = document.querySelectorAll(selector)
    allDetails.forEach((otherDetails) => {
      if (otherDetails !== detailsRef.current) {
        const otherDetailsElement = otherDetails as HTMLDetailsElement
        const otherAnswer = otherDetailsElement.querySelector(answerClass) as HTMLDivElement
        if (otherAnswer) {
          otherDetailsElement.removeAttribute('open')
          otherAnswer.style.maxHeight = '0px'
        }
      }
    })

    setIsOpen(newIsOpen)
  }

  const itemClasses = variant === 'media-kit' 
    ? 'ds-minimal-card ds-card--hover faq-item'
    : 'ds-faq-item'
  const answerClasses = variant === 'media-kit' 
    ? 'faq-answer'
    : 'ds-faq-answer'

  return (
    <div>
      <details ref={detailsRef} className={itemClasses}>
        <summary onClick={handleToggle}>{faq.question}</summary>
        <div ref={answerRef} className={answerClasses}>
          <p>
            {faq.answer.split(/(\*\*.*?\*\*|\*.*?\*)/).map((part, index) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>
              }
              if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
                return <em key={index}>{part.slice(1, -1)}</em>
              }
              return part
            })}
          </p>
        </div>
      </details>
    </div>
  )
}

export default function FAQAccordion({
  sectionTitle,
  sectionDescription,
  items = [],
  variant = 'default',
  className = '',
}: FAQAccordionProps) {
  const sectionClasses = variant === 'media-kit'
    ? `ds-media-kit-faq-section ${className}`
    : `ds-faq-accordion-section ${className}`
  const containerClasses = variant === 'media-kit'
    ? 'ds-media-kit-faq-container'
    : 'ds-faq-accordion-container'
  const descriptionClasses = variant === 'media-kit'
    ? 'section-description'
    : 'ds-faq-accordion-description'
  const accordionClasses = variant === 'media-kit'
    ? 'faq-accordion'
    : 'ds-faq-accordion'

  return (
    <section className={sectionClasses}>
      <div className={containerClasses}>
        {sectionTitle && (
          <SectionTitle>{sectionTitle}</SectionTitle>
        )}

        {sectionDescription && (
          <p className={descriptionClasses}>
            {sectionDescription}
          </p>
        )}

        {items.length > 0 && (
          <div className={accordionClasses}>
            {items.map((item, index) => (
              <FAQItem key={index} faq={item} variant={variant} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

