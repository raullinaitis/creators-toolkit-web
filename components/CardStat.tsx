/**
 * CardStat Component
 * 
 * Converted from snippets/ds-card-stat.liquid
 * Stat card with large number and label
 * 
 * ⚠️ IMPORTANT: When nesting CardStat inside another card component (like .performance-card),
 * use the 'nested' prop or override CSS to prevent double card effect (background + border + padding).
 * 
 * Example:
 * <div className="performance-card">
 *   <CardStat number="11.1M" label="Views" nested />
 * </div>
 */

'use client'

import React from 'react'
import { useCountUp } from '@/hooks/useCountUp'

export interface CardStatProps {
  /** Stat number (e.g., '11.1M', '75.9%', '4.5%') */
  number: string
  /** Stat label/description */
  label: string
  /** Additional description text below label */
  description?: string
  /** Additional CSS classes */
  className?: string
  /** 
   * When true, removes card styling (background, border, padding) for nesting inside other cards
   * Prevents double card effect when CardStat is inside another card component
   */
  nested?: boolean
  /** Enable hover lift and glow effects */
  hover?: boolean
}

export function CardStat({
  number,
  label,
  description,
  className = '',
  nested = false,
  hover = true,
}: CardStatProps) {
  const { value, ref } = useCountUp(number, { duration: 2500, delay: 200 })
  
  const classes = [
    'ds-card-stat',
    nested ? 'ds-card-stat--nested' : '',
    hover && !nested ? 'ds-card--hover' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="stat-number" ref={ref}>{value}</div>
      <h4 className="stat-label">{label}</h4>
      {description && <p className="card-description">{description}</p>}
    </div>
  )
}
