/* eslint-disable @next/next/no-img-element */
import { Card, Input, Textarea, ButtonPrimary, LinkRow } from '@/components'

const linkItems = [
  {
    title: 'Hailuo 2.3 — Agentic Content Creation',
    href: 'https://hailuoai.video/?utm_media_source=IG&utm_campaign=kol&utm_content=raullinaitis',
    image: 'https://www.google.com/s2/favicons?sz=128&domain=hailuoai.video',
  },
  {
    title: 'Meshy — AI 3D Generator',
    href: 'https://www.meshy.ai/discover',
    image: 'https://www.google.com/s2/favicons?sz=128&domain=meshy.ai',
  },
  {
    title: 'MusicGPT — AI Music Studio',
    href: 'https://musicgpt.com/',
    image: 'https://www.google.com/s2/favicons?sz=128&domain=musicgpt.com',
  },
  {
    title: 'Skywork — AI Workspace Suite',
    href: 'https://skywork.ai/',
    image: 'https://www.google.com/s2/favicons?sz=128&domain=skywork.ai',
  },
]

export default function LinksPage() {
  const gradientId = 'links-social-gradient'

  return (
    <>
      <div className="ds-links-shell">
        <section className="ds-links-page">
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--master-accent-primary)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'var(--master-accent-secondary)', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>

          <div className="ds-links-hero">
            <div className="ds-links-avatar">
              <div className="profile-image-wrapper">
                <img
                  src="/images/PROFILE%202025.png"
                  alt="Raullinaitis profile"
                  className="profile-image"
                  loading="lazy"
                />
              </div>
            </div>
            <h1 className="ds-links-name">
              <span className="gradient-accent">raullinaitis</span>
            </h1>
            <p className="ds-links-role">Creator, Mentor &amp; Founder of Creators-Toolkit</p>
            <div className="ds-links-social-group">
              <div className="ds-links-social-custom" aria-label="Contact links">
                <a
                  className="ds-links-icon-btn"
                  href="https://www.instagram.com/raullinaitis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="ds-links-icon" stroke={`url(#${gradientId})`}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  className="ds-links-icon-btn"
                  href="https://youtube.com/raullinaitis"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="ds-links-icon" stroke={`url(#${gradientId})`}>
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33Z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill={`url(#${gradientId})`}></polygon>
                  </svg>
                </a>
                <a
                  className="ds-links-icon-btn"
                  href="mailto:hello@raullinaitis.com"
                  aria-label="Email"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="ds-links-icon" stroke={`url(#${gradientId})`}>
                    <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </a>
                <a
                  className="ds-links-icon-btn"
                  href="https://wa.me/37064766015"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="ds-links-icon" stroke={`url(#${gradientId})`}>
                    <path d="M3.5 20 5 15.5a8 8 0 1 1 3.5 3.5L3.5 20Z" />
                    <path d="M8.5 9.5c0 .5.2 1 .6 1.5l.5.6c.4.5.9.9 1.4 1.2l.5.3c.5.3 1.1.4 1.6.1l1.1-.7c.2-.1.5 0 .6.3l.3 1.1" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <h2 className="ds-links-section-title">
            <span className="gradient-accent">Tools</span> I Use
          </h2>
          <div className="ds-links-list" aria-label="Featured links">
            {linkItems.map((item) => (
              <LinkRow
                key={item.title}
                title={item.title}
                href={item.href}
                image={item.image}
              />
            ))}
          </div>
        </section>
        <section className="ds-links-contact">
          <h2 className="ds-links-section-title">
            Let&apos;s Work <span className="gradient-accent">Together</span>
          </h2>
          <Card className="ds-links-contact-card" hover>
            <form
              className="ds-links-contact-form"
              action="mailto:hello@raullinaitis.com"
              method="post"
              encType="text/plain"
            >
              <div className="ds-links-contact-grid">
                <Input
                  label="Name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                />
              </div>
              <Textarea
                label="Project / message"
                name="message"
                required
                placeholder="What do you want to create together?"
                rows={5}
              />
              <div className="ds-links-contact-actions">
                <ButtonPrimary type="submit" text="Send message" size="md" />
              </div>
            </form>
          </Card>
        </section>
      </div>

    </>
  )
}

