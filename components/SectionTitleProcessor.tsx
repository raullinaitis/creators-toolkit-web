/**
 * SectionTitleProcessor Component
 * 
 * Client-side component that automatically processes all h2 elements
 * to add gradient accents to key words
 * Excludes hero sections (which use hero-headline class or are inside hero sections)
 */

'use client'

import { useEffect } from 'react'

export default function SectionTitleProcessor() {
  useEffect(() => {
    // Process all h2 elements, excluding hero sections
    const processSectionTitles = () => {
      // Find all h2 elements that are NOT in hero sections
      const allH2Elements = document.querySelectorAll('h2')
      
      // Also exclude h2 elements with hero-headline class
      const heroHeadlines = document.querySelectorAll('h2.hero-headline')
      const heroHeadlineSet = new Set(Array.from(heroHeadlines))
      
      // Find hero sections to exclude their h2 children
      const heroSections = document.querySelectorAll(
        '.ds-media-kit-hero-section, .hero-section, [class*="hero"]'
      )
      const heroSectionSet = new Set(Array.from(heroSections))

      allH2Elements.forEach((titleElement) => {
        // Skip hero headlines
        if (heroHeadlineSet.has(titleElement)) {
          return
        }

        // Skip h2 elements inside hero sections
        let parent: HTMLElement | null = titleElement.parentElement
        while (parent) {
          if (heroSectionSet.has(parent)) {
            return
          }
          parent = parent.parentElement
        }

        // Check if already processed - look for gradient-accent spans OR check for data attribute
        const hasGradientAccent = titleElement.querySelector('.gradient-accent')
        const isProcessed = titleElement.getAttribute('data-auto-accented') === 'true'
        
        if (hasGradientAccent || isProcessed) {
          return
        }

        // Get text content - handle both plain text and React-rendered content
        let text = ''
        const childNodes = Array.from(titleElement.childNodes)
        
        // Check if it's React-rendered with spans (from processGradientText that returned plain text)
        const hasReactSpans = childNodes.some(node => 
          node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
        )
        
        if (hasReactSpans || childNodes.length === 0) {
          // Get text from all text nodes
          text = childNodes
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .map(node => node.textContent || '')
            .join('')
        } else {
          // Plain text content
          text = titleElement.textContent || ''
        }
        
        // Skip if empty
        if (!text.trim()) {
          return
        }

        // Process existing [[text]] patterns first
        if (text.includes('[[') && text.includes(']]')) {
          const regex = /\[\[([^\]]+)\]\]/g
          const parts: (string | HTMLElement)[] = []
          let lastIndex = 0
          let match
          let key = 0

          while ((match = regex.exec(text)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
              const beforeText = text.substring(lastIndex, match.index)
              if (beforeText) {
                parts.push(beforeText)
              }
            }

            // Create gradient accent span
            const accentSpan = document.createElement('span')
            accentSpan.className = 'gradient-accent'
            accentSpan.textContent = match[1]
            accentSpan.setAttribute('data-processed', 'true')
            parts.push(accentSpan)

            lastIndex = match.index + match[0].length
            key++
          }

          // Add remaining text
          if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex))
          }

          // Replace content if we found matches
          if (parts.length > 0 && parts.some(p => typeof p !== 'string')) {
            titleElement.innerHTML = ''
            parts.forEach((part) => {
              if (typeof part === 'string') {
                titleElement.appendChild(document.createTextNode(part))
              } else {
                titleElement.appendChild(part)
              }
            })
            titleElement.setAttribute('data-auto-accented', 'true')
          }
        } else {
          // Auto-accent: Choose key words to accent
          // Strategy: Accent the last significant word(s) or important nouns
          const words = text.trim().split(/\s+/)
          
          if (words.length === 0) return

          // Skip common prefixes and articles
          const skipWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']
          
          // Find the last significant word(s) to accent
          // If single word, accent it
          // If 2-3 words, accent the last word
          // If 4+ words, accent the last 1-2 significant words
          let wordsToAccent: number[] = []
          
          if (words.length === 1) {
            wordsToAccent = [0]
          } else if (words.length <= 3) {
            // Accent the last word
            wordsToAccent = [words.length - 1]
          } else {
            // For longer titles, accent the last 1-2 significant words
            // Find last non-skip word
            let lastSignificantIndex = words.length - 1
            while (lastSignificantIndex >= 0 && skipWords.includes(words[lastSignificantIndex].toLowerCase())) {
              lastSignificantIndex--
            }
            
            if (lastSignificantIndex >= 0) {
              // Accent the last significant word, and maybe the one before it if it's also significant
              wordsToAccent = [lastSignificantIndex]
              if (lastSignificantIndex > 0 && !skipWords.includes(words[lastSignificantIndex - 1].toLowerCase())) {
                wordsToAccent.unshift(lastSignificantIndex - 1)
              }
            } else {
              // Fallback: accent last word
              wordsToAccent = [words.length - 1]
            }
          }

          // Build the new content with gradient accents
          titleElement.innerHTML = ''
          words.forEach((word, index) => {
            if (wordsToAccent.includes(index)) {
              const accentSpan = document.createElement('span')
              accentSpan.className = 'gradient-accent'
              accentSpan.textContent = word
              accentSpan.setAttribute('data-processed', 'true')
              titleElement.appendChild(accentSpan)
            } else {
              titleElement.appendChild(document.createTextNode(word))
            }
            
            // Add space after word (except last)
            if (index < words.length - 1) {
              titleElement.appendChild(document.createTextNode(' '))
            }
          })
          
          titleElement.setAttribute('data-auto-accented', 'true')
        }
      })
    }

    // Use MutationObserver to catch dynamically added content
    const observer = new MutationObserver(() => {
      processSectionTitles()
    })

    // Observe the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Run on mount and after delays to catch React-rendered content
    processSectionTitles()
    const timeoutId1 = setTimeout(processSectionTitles, 100)
    const timeoutId2 = setTimeout(processSectionTitles, 500)
    const timeoutId3 = setTimeout(processSectionTitles, 1000)

    return () => {
      observer.disconnect()
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
      clearTimeout(timeoutId3)
    }
  }, [])

  return null
}

