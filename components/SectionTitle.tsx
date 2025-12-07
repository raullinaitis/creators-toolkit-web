/**
 * SectionTitle Component
 * 
 * Reusable h2 component that automatically processes [[text]] gradient accents
 * Excludes hero sections (which use hero-headline class)
 */

import React from 'react'

interface SectionTitleProps {
  children: string
  className?: string
}

/**
 * Process headline text to convert [[text]] to gradient accent spans
 */
function processGradientText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const regex = /\[\[([^\]]+)\]\]/g
  let lastIndex = 0
  let match
  let key = 0

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index)
      if (beforeText) {
        parts.push(beforeText)
      }
    }

    parts.push(
      <span key={key++} className="gradient-accent">
        {match[1]}
      </span>
    )

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}

export default function SectionTitle({ 
  children, 
  className = 'ds-section-heading-title' 
}: SectionTitleProps) {
  return (
    <h2 className={className}>
      {processGradientText(children)}
    </h2>
  )
}











