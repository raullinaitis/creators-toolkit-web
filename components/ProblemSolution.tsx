/**
 * Problem Solution Component
 * 
 * Text block with before/after comparison sliders
 * Shows the difference between random generation and professional production
 */

'use client'
/* eslint-disable @next/next/no-img-element */

import React, { useState, useRef, useEffect } from 'react'
import { SectionTitle } from '@/components'

interface Slide {
  beforeImage: string
  afterImage: string
  label?: string
}

interface ProblemSolutionProps {
  headline?: string
  body?: string
  slides?: Slide[]
  caption?: string
  className?: string
}

// Internal CompareSlider component
interface CompareSliderProps {
  beforeImage: string
  afterImage: string
  label?: string
  className?: string
}

function CompareSlider({ beforeImage, afterImage, label, className = '' }: CompareSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    updateSliderPosition(e.clientX)
  }

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return
    updateSliderPosition(e.touches[0].clientX)
  }

  const handleTouchStart = () => {
    setIsDragging(true)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    const handleGlobalTouchEnd = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp)
      document.addEventListener('touchend', handleGlobalTouchEnd)
      return () => {
        document.removeEventListener('mouseup', handleGlobalMouseUp)
        document.removeEventListener('touchend', handleGlobalTouchEnd)
      }
    }
  }, [isDragging])

  return (
    <div className={`ds-compare-slider-wrapper ${className}`}>
      {label && (
        <p className="ds-compare-slider-label">{label}</p>
      )}
      <div
        ref={containerRef}
        className="ds-compare-slider-container"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="ds-compare-slider-before">
          <img src={beforeImage} alt="Before" />
        </div>
        <div
          className="ds-compare-slider-after"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img src={afterImage} alt="After" />
        </div>
        <div
          className="ds-compare-slider-handle"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="ds-compare-slider-handle-line"></div>
          <div className="ds-compare-slider-handle-circle"></div>
        </div>
      </div>
    </div>
  )
}

export default function ProblemSolution({
  headline,
  body,
  slides = [],
  caption,
  className = '',
}: ProblemSolutionProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className={`ds-problem-solution-section ${className}`}>
      <div className="ds-problem-solution-container">
        {headline && (
          <SectionTitle>{headline}</SectionTitle>
        )}

        {body && (
          <div className="ds-problem-solution-body">
            {body.split('\n').map((paragraph, index) => (
              <p key={index} className="ds-problem-solution-paragraph">
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

        {slides.length > 0 && (
          <>
            {/* Mobile Tab Navigation */}
            <div className="ds-problem-solution-tabs">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  className={`ds-problem-solution-tab ${activeTab === index ? 'active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  {slide.label}
                </button>
              ))}
            </div>

            {/* Desktop Grid Layout */}
            <div className="ds-problem-solution-sliders">
              {slides.map((slide, index) => (
                <CompareSlider
                  key={index}
                  beforeImage={slide.beforeImage}
                  afterImage={slide.afterImage}
                  label={slide.label}
                  className={activeTab === index ? 'active' : ''}
                />
              ))}
            </div>
          </>
        )}

        {caption && (
          <p className="ds-problem-solution-caption">
            {caption}
          </p>
        )}
      </div>
    </section>
  )
}

