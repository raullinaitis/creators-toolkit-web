/**
 * LinkRow Component
 * Mobile-first link row with DS tokens
 */

import Link from 'next/link'
import { Card } from './Card'

export interface LinkRowProps {
  title: string
  href: string
  description?: string
  ariaLabel?: string
  openInNewTab?: boolean
  image?: string
}

function renderTitle(title: string) {
  const hasEmDash = title.includes('—')
  const hasHyphen = title.includes(' - ')

  if (!hasEmDash && !hasHyphen) {
    return <span className="ds-link-row__title">{title}</span>
  }

  const separator = hasEmDash ? '—' : '-'
  const [brand, ...rest] = title.split(separator)
  const explainer = rest.join(separator).trim()

  return (
    <span className="ds-link-row__title ds-link-row__title-split">
      <span className="ds-link-row__brand">{brand.trim()}</span>
      <span className="ds-link-row__dash"> — </span>
      <span className="ds-link-row__explainer">{explainer}</span>
    </span>
  )
}

export default function LinkRow({
  title,
  href,
  description,
  ariaLabel,
  openInNewTab = true,
  image,
}: LinkRowProps) {
  const target = openInNewTab ? '_blank' : undefined
  const rel = openInNewTab ? 'noopener noreferrer' : undefined

  return (
    <Card hover className="ds-link-row">
      <Link
        href={href}
        className="ds-link-row__inner"
        aria-label={ariaLabel || title}
        target={target}
        rel={rel}
      >
        {image && (
          <span className="ds-link-row__thumb" aria-hidden="true">
            <img src={image} alt="" loading="lazy" />
          </span>
        )}
        <div className="ds-link-row__text">
          {renderTitle(title)}
          {description && <span className="ds-link-row__desc">{description}</span>}
        </div>
        <span className="ds-link-row__icon" aria-hidden="true">
          ›
        </span>
      </Link>
    </Card>
  )
}

