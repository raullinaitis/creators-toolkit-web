/**
 * Shortcut Section Component
 * 
 * Section displayed after hero with headline, subheadline, and checkmark points
 */

'use client'

import React from 'react'

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
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }

    // Add the gradient accent span
    parts.push(
      <span key={key++} className="gradient-accent">
        {match[1]}
      </span>
    )

    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}

interface ShortcutSectionProps {
  className?: string
}

export default function ShortcutSection({
  className = '',
}: ShortcutSectionProps) {
  return (
    <section className={`ds-shortcut-section ${className}`}>
      <div className="ds-shortcut-container">
        <h2 className="ds-shortcut-heading">
          {processGradientText("Now you've seen what [[Nano Banana]] can do…")}
        </h2>
        <p className="ds-shortcut-subheading">
          Here&apos;s the shortcut: 1,500 hand‑picked prompts already written, already tested, already organized.
        </p>
        <ul className="ds-shortcut-points">
          <li>No guessing.</li>
          <li>No wasted time.</li>
          <li>Just results.</li>
        </ul>
      </div>
    </section>
  )
}




