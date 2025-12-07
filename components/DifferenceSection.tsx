/**
 * Difference Section Component
 * 
 * Shows the difference between random generation and professional production
 * with 4 comparison sliders
 */

'use client'
/* eslint-disable @next/next/no-img-element */

import React, { useState, useRef, useEffect } from 'react'

interface ComparisonSlide {
  label: string
  beforeLabel: string
  afterLabel: string
  beforeImage: string
  afterImage: string
}

interface DifferenceSectionProps {
  className?: string
}

// Internal CompareSlider component (reused from ProblemSolution pattern)
interface CompareSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel: string
  afterLabel: string
  label: string
  className?: string
}

function CompareSlider({ beforeImage, afterImage, beforeLabel, afterLabel, label, className = '' }: CompareSliderProps) {
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
    <div className={`ds-difference-slider-wrapper ${className}`}>
      <p className="ds-difference-slider-label">{label}</p>
      <div
        ref={containerRef}
        className="ds-difference-slider-container"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="ds-difference-slider-before">
          <img src={beforeImage} alt={beforeLabel} />
          <div className="ds-difference-slider-before-label">{beforeLabel}</div>
        </div>
        <div
          className="ds-difference-slider-after"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img src={afterImage} alt={afterLabel} />
          <div className="ds-difference-slider-after-label">{afterLabel}</div>
        </div>
        <div
          className="ds-difference-slider-handle"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="ds-difference-slider-handle-line"></div>
          <div className="ds-difference-slider-handle-circle"></div>
        </div>
      </div>
    </div>
  )
}

export default function DifferenceSection({
  className = '',
}: DifferenceSectionProps) {
  const comparisons: ComparisonSlide[] = [
    {
      label: 'Create',
      beforeLabel: 'Boring Stock',
      afterLabel: 'Cinematic Key Art',
      beforeImage: 'https://via.placeholder.com/800x450/333333/FFFFFF?text=Boring+Stock',
      afterImage: 'https://via.placeholder.com/800x450/3d69e2/FFFFFF?text=Cinematic+Key+Art',
    },
    {
      label: 'Edit',
      beforeLabel: 'Flat Lighting',
      afterLabel: 'Studio Lighting Fix',
      beforeImage: 'https://via.placeholder.com/800x450/333333/FFFFFF?text=Flat+Lighting',
      afterImage: 'https://via.placeholder.com/800x450/3d69e2/FFFFFF?text=Studio+Lighting+Fix',
    },
    {
      label: 'Fix',
      beforeLabel: 'AI Artifacts',
      afterLabel: 'Clean Inpainting',
      beforeImage: 'https://via.placeholder.com/800x450/333333/FFFFFF?text=AI+Artifacts',
      afterImage: 'https://via.placeholder.com/800x450/3d69e2/FFFFFF?text=Clean+Inpainting',
    },
    {
      label: 'Style',
      beforeLabel: 'Inconsistent Look',
      afterLabel: 'Perfect Brand Match',
      beforeImage: 'https://via.placeholder.com/800x450/333333/FFFFFF?text=Inconsistent+Look',
      afterImage: 'https://via.placeholder.com/800x450/3d69e2/FFFFFF?text=Perfect+Brand+Match',
    },
  ]

  return (
    <section className={`ds-difference-section ${className}`}>
      <div className="ds-difference-container">
        <h2 className="ds-difference-heading">
          The Difference Between &quot;Random Gen&quot; and &quot;Professional Production&quot;
        </h2>

        <div className="ds-difference-body">
          <p className="ds-difference-paragraph">
            Most creators treat AI like a slot machine—typing random words and hoping for a usable image. That works for hobbyists, not pros.
          </p>
          <p className="ds-difference-paragraph">
            Real production requires control. You need to generate specific assets, fix specific details, and maintain consistent style across an entire project.
          </p>
        </div>

        <div className="ds-difference-sliders-grid">
          {comparisons.map((comparison, index) => (
            <CompareSlider
              key={index}
              label={comparison.label}
              beforeLabel={comparison.beforeLabel}
              afterLabel={comparison.afterLabel}
              beforeImage={comparison.beforeImage}
              afterImage={comparison.afterImage}
            />
          ))}
        </div>

        <p className="ds-difference-closing">
          The difference isn&apos;t luck. It&apos;s the specific prompts you use to guide the engine.
        </p>
      </div>
    </section>
  )
}




