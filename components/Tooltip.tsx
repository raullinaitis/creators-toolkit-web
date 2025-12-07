/**
 * Tooltip Component
 * 
 * Converted from snippets/ds-tooltip.liquid
 * Tooltip for hover/focus information displays
 */

'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

export interface TooltipProps {
  /** Tooltip content text */
  content: string
  /** Content that triggers the tooltip */
  triggerContent: React.ReactNode
  /** Tooltip position */
  position?: 'top' | 'bottom' | 'left' | 'right'
  /** Trigger method */
  trigger?: 'hover' | 'click' | 'focus'
  /** Maximum tooltip width */
  maxWidth?: string
  /** Additional CSS classes */
  className?: string
  /** Unique ID suffix for tooltip ID */
  idSuffix?: string
}

export default function Tooltip({
  content,
  triggerContent,
  position = 'top',
  trigger = 'hover',
  maxWidth = '250px',
  className = '',
  idSuffix,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(position)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement | HTMLSpanElement>(null)

  const tooltipId = `tooltip-${content.replace(/\s+/g, '-').toLowerCase()}${idSuffix ? `-${idSuffix}` : ''}`

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        trigger === 'click' &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false)
      }
    }

    if (trigger === 'click') {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [trigger])

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && isVisible) {
        setIsVisible(false)
        if (triggerRef.current) {
          if ('focus' in triggerRef.current) {
            triggerRef.current.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isVisible, trigger])

  const positionTooltip = useCallback(() => {
    if (!contentRef.current) return

    const rect = contentRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    if (currentPosition === 'top' && rect.top < 0) {
      setCurrentPosition('bottom')
    } else if (currentPosition === 'bottom' && rect.bottom > viewportHeight) {
      setCurrentPosition('top')
    } else if (currentPosition === 'left' && rect.left < 0) {
      setCurrentPosition('right')
    } else if (currentPosition === 'right' && rect.right > viewportWidth) {
      setCurrentPosition('left')
    }
  }, [currentPosition])

  useEffect(() => {
    if (isVisible && contentRef.current) {
      positionTooltip()
    }
  }, [isVisible, positionTooltip])

  const handleTriggerClick = () => {
    if (trigger === 'click') {
      setIsVisible(!isVisible)
    }
  }

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsVisible(true)
    }
  }

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsVisible(false)
    }
  }

  const handleFocus = () => {
    if (trigger === 'focus') {
      setIsVisible(true)
    }
  }

  const handleBlur = () => {
    if (trigger === 'focus') {
      setIsVisible(false)
    }
  }

  const classes = [
    'ds-tooltip-wrapper',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const triggerProps = {
    className: 'ds-tooltip-trigger',
    'aria-describedby': tooltipId,
    ref: triggerRef as React.RefObject<HTMLElement>,
    ...(trigger === 'click'
      ? {
          onClick: handleTriggerClick,
          type: 'button' as const,
        }
      : {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          onFocus: handleFocus,
          onBlur: handleBlur,
          tabIndex: 0,
        }),
  }

  return (
    <div
      ref={wrapperRef}
      className={classes}
      data-tooltip
      data-tooltip-position={currentPosition}
      data-tooltip-trigger={trigger}
      data-tooltip-visible={isVisible}
    >
      {trigger === 'click' ? (
        <button {...(triggerProps as any)}>{triggerContent}</button>
      ) : (
        <span {...(triggerProps as any)}>{triggerContent}</span>
      )}
      <div
        ref={contentRef}
        id={tooltipId}
        className="ds-tooltip-content"
        role="tooltip"
        aria-hidden={!isVisible}
        style={{ maxWidth }}
      >
        {content}
        <div className="ds-tooltip-arrow"></div>
      </div>
    </div>
  )
}

















