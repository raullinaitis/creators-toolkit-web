import React from 'react'
import {
  TokensVisualization,
  ButtonPrimary,
  ButtonSecondary,
  ButtonGhost,
  Card,
  CardSimple,
  CardFeature,
  CardStat,
  CardTestimonial,
  Input,
  Textarea,
  Select,
  Checkbox,
  Toggle,
  Alert,
  Tooltip,
  Spinner,
  Blockquote,
  SocialLinks,
  Divider,
  Breadcrumb,
} from '@/components'
import type { BreadcrumbItem, SelectOption } from '@/components'

const breadcrumbItems: BreadcrumbItem[] = [
  { text: 'Home', url: '/' },
  { text: 'Brand Book' },
]

const selectOptions: SelectOption[] = [
  { label: 'Primary CTA', value: 'primary' },
  { label: 'Secondary CTA', value: 'secondary' },
  { label: 'Ghost CTA', value: 'ghost' },
]

export default function BrandBookPage() {
  return (
    <div className="ds-page-container">
      <div className="ds-showcase-section">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="ds-showcase-title">Brand Book</h1>
        <p className="ds-showcase-subtitle">
          Visual source of truth for tokens, components, and usage notes
        </p>
        <p className="ds-component-path">
          Powered by <code>app/tokens.css</code> and <code>components/components.css</code>
        </p>
      </div>

      <section className="ds-showcase-section" id="tokens">
        <h2 className="ds-component-title">Design Tokens</h2>
        <p className="ds-component-path">Everything cascades from these variables</p>
        <TokensVisualization />
      </section>

      <section className="ds-showcase-section" id="components">
        <h2 className="ds-component-title">Component Previews</h2>
        <p className="ds-component-path">Reusable building blocks with shared styling</p>

        <div className="ds-component-section">
          <h3 className="ds-showcase-subtitle">Buttons & CTAs</h3>
          <div className="ds-component-wrapper-flex">
            <ButtonPrimary text="Primary Action" url="#" />
            <ButtonSecondary text="Secondary Action" url="#" />
            <ButtonGhost text="Ghost Action" url="#" />
          </div>
        </div>

        <div className="ds-component-section">
          <h3 className="ds-showcase-subtitle">Cards & Highlights</h3>
          <div className="ds-component-wrapper-flex">
            <Card hover className="ds-component-wrapper-inline">
              <h3 className="ds-component-title">Card</h3>
              <p className="ds-component-path">components/Card.tsx</p>
              <p>
                Default surface with frosted glass effect, hover glow, and token-driven spacing.
              </p>
            </Card>
            <CardSimple title="CardSimple" hover>
              <p>Minimal container for lightweight content or lists.</p>
            </CardSimple>
            <CardFeature
              title="CardFeature"
              text="Feature highlight with gradient icon treatment."
              iconSvg={
                <svg viewBox="0 0 24 24" aria-hidden="true" width="32" height="32">
                  <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                </svg>
              }
            />
            <CardStat number="11.1M" label="Views" description="Count-up animation enabled" />
            <CardTestimonial
              quote="This system keeps our surfaces consistent and fast to ship."
              author="Jordan Avery"
              role="Lead Designer"
              rating={5}
            />
          </div>
        </div>

        <div className="ds-component-section">
          <h3 className="ds-showcase-subtitle">Forms</h3>
          <Card className="ds-component-wrapper ds-component-wrapper-flex-full">
            <div className="ds-component-wrapper-flex-column">
              <Input
                label="Email"
                name="email"
                placeholder="you@example.com"
                helpText="Uses ds-input-wrapper tokens for borders and focus states."
              />
              <Textarea
                label="Message"
                name="message"
                placeholder="Share feedback..."
                helpText="Auto-resizes with consistent padding and counters."
              />
              <Select
                label="CTA Preference"
                name="cta"
                options={selectOptions}
                placeholder="Choose a style"
              />
              <div className="ds-component-wrapper-flex">
                <Checkbox label="Subscribe to updates" name="subscribe" />
                <Toggle label="Enable notifications" name="notifications" />
              </div>
            </div>
          </Card>
        </div>

        <div className="ds-component-section">
          <h3 className="ds-showcase-subtitle">Feedback & Overlays</h3>
          <div className="ds-component-wrapper-flex">
            <Alert
              variant="success"
              title="Success state"
              message="Alerts use semantic tokens and focus-visible states."
            />
            <Tooltip content="Position-aware tooltip" triggerContent="Hover me" />
            <Spinner label="Loading spinner" size="md" />
          </div>
        </div>

        <div className="ds-component-section">
          <h3 className="ds-showcase-subtitle">Navigation & Text</h3>
          <div className="ds-component-wrapper-flex">
            <Breadcrumb items={breadcrumbItems} />
            <Divider text="Section Divider" />
            <Blockquote
              quote="Design tokens are the single source of truth for our look and feel."
              author="Design System"
              role="Guidance"
            />
            <SocialLinks
              urls={{
                twitter: 'https://twitter.com',
                linkedin: 'https://linkedin.com',
              }}
              size="sm"
            />
          </div>
        </div>
      </section>

      <section className="ds-showcase-section" id="usage">
        <h2 className="ds-component-title">Usage & Accessibility Notes</h2>
        <p className="ds-component-path">Guardrails to keep the brand consistent</p>
        <Card className="ds-component-wrapper ds-component-wrapper-flex-column">
          <ul className="ds-flex-column-sm">
            <li>Use design tokens for all spacing, color, and typography — never hardcode values.</li>
            <li>Reuse components from <code>components/index.ts</code>; avoid recreating patterns.</li>
            <li>Respect focus states and aria labels on all interactive elements.</li>
            <li>Keep hover effects disabled on touch devices; mobile styles are first-class.</li>
            <li>Animate responsibly with `prefers-reduced-motion` respected in the components.</li>
          </ul>
        </Card>
      </section>
    </div>
  )
}









