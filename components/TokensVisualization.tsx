/**
 * Tokens Visualization Component
 * 
 * Displays all design system tokens in an organized, visual format
 */

'use client'

import React from 'react'
import { Card } from '@/components'

export default function TokensVisualization() {
  return (
    <section className="ds-tokens-visualization">
      <div className="ds-tokens-container">
        <h1 className="ds-tokens-title">Design System Tokens</h1>
        <p className="ds-tokens-description">
          Complete reference of all design tokens used throughout the system. 
          Change values in <code>app/tokens.css</code> to update globally.
        </p>

        {/* Level 1: Master Colors */}
        <div className="ds-tokens-section">
          <h2 className="ds-tokens-section-title">Level 1: Master Color Controls</h2>
          <p className="ds-tokens-section-description">Source of truth for all colors</p>
          <div className="ds-tokens-grid">
            <Card className="ds-token-card">
              <div className="ds-token-color-swatch" style={{ backgroundColor: 'var(--master-accent-primary)' }}></div>
              <div className="ds-token-info">
                <div className="ds-token-name">--master-accent-primary</div>
                <div className="ds-token-value">#3d69e2</div>
                <div className="ds-token-description">Primary brand color</div>
              </div>
            </Card>
            <Card className="ds-token-card">
              <div className="ds-token-color-swatch" style={{ backgroundColor: 'var(--master-accent-secondary)' }}></div>
              <div className="ds-token-info">
                <div className="ds-token-name">--master-accent-secondary</div>
                <div className="ds-token-value">#5bafd1</div>
                <div className="ds-token-description">Secondary brand color</div>
              </div>
            </Card>
            <Card className="ds-token-card">
              <div className="ds-token-color-swatch ds-token-color-swatch-bordered" style={{ backgroundColor: 'var(--master-bg-dark)' }}></div>
              <div className="ds-token-info">
                <div className="ds-token-name">--master-bg-dark</div>
                <div className="ds-token-value">#000000</div>
                <div className="ds-token-description">Main page background</div>
              </div>
            </Card>
            <Card className="ds-token-card">
              <div className="ds-token-color-swatch ds-token-color-swatch-bordered" style={{ backgroundColor: 'var(--master-bg-surface)' }}></div>
              <div className="ds-token-info">
                <div className="ds-token-name">--master-bg-surface</div>
                <div className="ds-token-value">#00101F</div>
                <div className="ds-token-description">Card and surface backgrounds</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Unified Line/Border Tokens */}
        <div className="ds-tokens-section">
          <h2 className="ds-tokens-section-title">Unified Line/Border Tokens</h2>
          <p className="ds-tokens-section-description">Controls grid lines, card borders, and form inputs</p>
          <div className="ds-tokens-grid">
            <Card className="ds-token-card">
              <div className="ds-token-line-preview" style={{ 
                backgroundColor: 'var(--line-color)',
                height: 'var(--line-width)',
                width: '100%'
              }}></div>
              <div className="ds-token-info">
                <div className="ds-token-name">--line-color</div>
                <div className="ds-token-value">rgba(61, 105, 226, 0.2)</div>
                <div className="ds-token-description">Computed line color with opacity</div>
              </div>
            </Card>
            <Card className="ds-token-card">
              <div className="ds-token-line-preview" style={{ 
                backgroundColor: 'var(--line-color)',
                height: 'var(--line-width)',
                width: '100%'
              }}></div>
              <div className="ds-token-info">
                <div className="ds-token-name">--line-width</div>
                <div className="ds-token-value">2px</div>
                <div className="ds-token-description">Unified width for all lines/borders</div>
              </div>
            </Card>
            <Card className="ds-token-card">
              <div className="ds-token-info">
                <div className="ds-token-name">--line-opacity</div>
                <div className="ds-token-value">0.2</div>
                <div className="ds-token-description">Unified opacity (0-1 where 1 = 100%)</div>
              </div>
            </Card>
            <Card className="ds-token-card">
              <div className="ds-token-info">
                <div className="ds-token-name">--line-color-base-rgb</div>
                <div className="ds-token-value">61, 105, 226</div>
                <div className="ds-token-description">RGB values for primary color (#3d69e2)</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Level 2: Semantic Colors */}
        <div className="ds-tokens-section">
          <h2 className="ds-tokens-section-title">Level 2: Semantic Color Mappings</h2>
          <p className="ds-tokens-section-description">Contextual meaning derived from master colors</p>
          <div className="ds-tokens-grid">
            <Card className="ds-token-card">
              <div className="ds-token-color-swatch" style={{ backgroundColor: 'var(--color-primary)' }}></div>
              <div className="ds-token-info">
                <div className="ds-token-name">--color-primary</div>
                <div className="ds-token-value">var(--master-accent-primary)</div>
              </div>
            </Card>
            <Card className="ds-token-card">
              <div className="ds-token-color-swatch" style={{ backgroundColor: 'var(--color-secondary)' }}></div>
              <div className="ds-token-info">
                <div className="ds-token-name">--color-secondary</div>
                <div className="ds-token-value">var(--master-accent-secondary)</div>
              </div>
            </Card>
            <Card className="ds-token-card">
              <div className="ds-token-color-swatch" style={{ backgroundColor: 'var(--color-success)' }}></div>
              <div className="ds-token-info">
                <div className="ds-token-name">--color-success</div>
                <div className="ds-token-value">#10b981</div>
              </div>
            </Card>
            <Card className="ds-token-card">
              <div className="ds-token-color-swatch" style={{ backgroundColor: 'var(--color-warning)' }}></div>
              <div className="ds-token-info">
                <div className="ds-token-name">--color-warning</div>
                <div className="ds-token-value">#f59e0b</div>
              </div>
            </Card>
            <Card className="ds-token-card">
              <div className="ds-token-color-swatch" style={{ backgroundColor: 'var(--color-error)' }}></div>
              <div className="ds-token-info">
                <div className="ds-token-name">--color-error</div>
                <div className="ds-token-value">#ef4444</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Text Colors */}
        <div className="ds-tokens-section">
          <h2 className="ds-tokens-section-title">Text Colors</h2>
          <div className="ds-tokens-grid">
            <Card className="ds-token-card">
              <div className="ds-token-text-preview" style={{ color: 'var(--color-text-default)' }}>
                Default Text
              </div>
              <div className="ds-token-info">
                <div className="ds-token-name">--color-text-default</div>
                <div className="ds-token-value">#e5e5e5</div>
              </div>
            </Card>
            <Card className="ds-token-card">
              <div className="ds-token-text-preview" style={{ color: 'var(--color-text-muted)' }}>
                Muted Text
              </div>
              <div className="ds-token-info">
                <div className="ds-token-name">--color-text-muted</div>
                <div className="ds-token-value">#d1d5db</div>
              </div>
            </Card>
            <Card className="ds-token-card">
              <div className="ds-token-text-preview" style={{ color: 'var(--color-text-subtle)' }}>
                Subtle Text
              </div>
              <div className="ds-token-info">
                <div className="ds-token-name">--color-text-subtle</div>
                <div className="ds-token-value">#d1d5db</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Spacing Tokens */}
        <div className="ds-tokens-section">
          <h2 className="ds-tokens-section-title">Spacing Scale</h2>
          <div className="ds-tokens-grid">
            {[
              { name: '--space-xs', value: '0.5rem', px: '8px' },
              { name: '--space-sm', value: '1rem', px: '16px' },
              { name: '--space-md', value: '1.5rem', px: '24px' },
              { name: '--space-lg', value: '2rem', px: '32px' },
              { name: '--space-xl', value: '2.5rem', px: '40px' },
              { name: '--space-2xl', value: '3rem', px: '48px' },
              { name: '--space-3xl', value: '3.5rem', px: '56px' },
              { name: '--space-xxl', value: '4rem', px: '64px' },
            ].map((space) => (
              <Card key={space.name} className="ds-token-card">
                <div className="ds-token-spacing-preview">
                  <div style={{ 
                    width: space.value,
                    height: space.value,
                    backgroundColor: 'var(--color-primary)',
                    opacity: 0.3,
                    borderRadius: '4px'
                  }}></div>
                </div>
                <div className="ds-token-info">
                  <div className="ds-token-name">{space.name}</div>
                  <div className="ds-token-value">{space.value} ({space.px})</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Typography Tokens */}
        <div className="ds-tokens-section">
          <h2 className="ds-tokens-section-title">Typography Scale</h2>
          <div className="ds-tokens-list">
            {[
              { name: '--fs-h1', value: 'clamp(2.5rem, 4vw + 0.5rem, 3.5rem)', weight: '--fw-h1 (600)', example: 'Heading 1' },
              { name: '--fs-h2', value: 'clamp(2rem, 3.5vw + 0.5rem, 2.75rem)', weight: '--fw-h2 (600)', example: 'Heading 2' },
              { name: '--fs-h3', value: 'clamp(1.5rem, 2.5vw + 0.5rem, 2rem)', weight: '--fw-h3 (600)', example: 'Heading 3' },
              { name: '--fs-h4', value: 'clamp(1.25rem, 1.25vw + 0.875rem, 1.5rem)', weight: '--fw-h4 (700)', example: 'Heading 4' },
              { name: '--fs-lead', value: 'clamp(1.125rem, 0.625vw + 0.875rem, 1.25rem)', weight: '--fw-lead (400)', example: 'Lead Text' },
              { name: '--fs-body', value: 'clamp(1rem, 0.625vw + 0.875rem, 1.125rem)', weight: '--fw-body (400)', example: 'Body Text' },
              { name: '--fs-sm', value: '0.875rem', weight: '--fw-sm (400)', example: 'Small Text' },
              { name: '--fs-caption', value: '0.75rem', weight: '--fw-caption (600)', example: 'CAPTION TEXT', note: 'UPPERCASE' },
            ].map((font) => (
              <Card key={font.name} className="ds-token-card ds-token-card-horizontal">
                <div className="ds-token-typography-preview" style={{ fontSize: font.value }}>
                  {font.example}
                </div>
                <div className="ds-token-info">
                  <div className="ds-token-name">{font.name}</div>
                  <div className="ds-token-value">{font.value}{font.note ? ` (${font.note})` : ''}</div>
                  <div className="ds-token-weight">{font.weight}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Border Radius */}
        <div className="ds-tokens-section">
          <h2 className="ds-tokens-section-title">Border Radius</h2>
          <div className="ds-tokens-grid">
            {[
              { name: '--radius-sm', value: '1.5rem', px: '24px' },
              { name: '--radius-md', value: '2rem', px: '32px' },
              { name: '--radius-lg', value: '2.5rem', px: '40px' },
              { name: '--radius-full', value: '9999px', px: 'Full circle' },
            ].map((radius) => (
              <Card key={radius.name} className="ds-token-card">
                <div className="ds-token-radius-preview">
                  <div style={{ 
                    width: '60px',
                    height: '60px',
                    borderRadius: radius.value,
                    border: '2px solid var(--line-color)',
                    backgroundColor: 'transparent'
                  }}></div>
                </div>
                <div className="ds-token-info">
                  <div className="ds-token-name">{radius.name}</div>
                  <div className="ds-token-value">{radius.value} ({radius.px})</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Gradient Tokens */}
        <div className="ds-tokens-section">
          <h2 className="ds-tokens-section-title">Gradient Tokens</h2>
          <p className="ds-tokens-section-description">Used for text accents, buttons, and visual effects</p>
          <div className="ds-tokens-grid">
            <Card className="ds-token-card">
              <div className="ds-token-gradient-preview" style={{ background: 'var(--gradient-primary)' }}></div>
              <div className="ds-token-info">
                <div className="ds-token-name">--gradient-primary</div>
                <div className="ds-token-value">135deg, primary → secondary</div>
                <div className="ds-token-description">Used in buttons and cards</div>
              </div>
            </Card>
            <Card className="ds-token-card">
              <div className="ds-token-gradient-preview" style={{ background: 'var(--gradient-text)' }}></div>
              <div className="ds-token-info">
                <div className="ds-token-name">--gradient-text</div>
                <div className="ds-token-value">to bottom, primary → secondary</div>
                <div className="ds-token-description">Used for gradient-accent text</div>
              </div>
            </Card>
            <Card className="ds-token-card">
              <div className="ds-token-text-preview-gradient" style={{ 
                background: 'var(--gradient-text)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Gradient Accent
              </div>
              <div className="ds-token-info">
                <div className="ds-token-name">.gradient-accent</div>
                <div className="ds-token-value">CSS class</div>
                <div className="ds-token-description">Used in MediaKitHero, SectionTitle</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Animation Timing */}
        <div className="ds-tokens-section">
          <h2 className="ds-tokens-section-title">Animation Timing</h2>
          <p className="ds-tokens-section-description">Duration values for transitions and animations</p>
          <div className="ds-tokens-grid">
            {[
              { name: '--duration-instant', value: '100ms' },
              { name: '--duration-fast', value: '250ms' },
              { name: '--duration-base', value: '500ms' },
              { name: '--duration-slow', value: '700ms' },
            ].map((duration) => (
              <Card key={duration.name} className="ds-token-card">
                <div className="ds-token-info">
                  <div className="ds-token-name">{duration.name}</div>
                  <div className="ds-token-value">{duration.value}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Animation Easing */}
        <div className="ds-tokens-section">
          <h2 className="ds-tokens-section-title">Animation Easing</h2>
          <p className="ds-tokens-section-description">Easing functions for smooth transitions (used with --duration-base)</p>
          <div className="ds-tokens-grid">
            {[
              { name: '--ease-out', value: 'cubic-bezier(0.215, 0.61, 0.355, 1)' },
              { name: '--ease-in', value: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)' },
              { name: '--ease-smooth', value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
              { name: '--ease-spring', value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
              { name: '--ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
            ].map((easing) => (
              <Card key={easing.name} className="ds-token-card">
                <div className="ds-token-info">
                  <div className="ds-token-name">{easing.name}</div>
                  <div className="ds-token-value">{easing.value}</div>
                  {easing.name === '--ease-smooth' && (
                    <div className="ds-token-description">Most commonly used in media kit</div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

