/**
 * Media Kit Contact Component
 * 
 * Converted from Shopify Liquid section to React/Next.js
 * Contact form with two-column layout
 */

'use client'

import React, { useState } from 'react'
import { SectionTitle, Input, Textarea, Select, ButtonPrimary, SectionParallax } from '@/components'
import type { SelectOption } from '@/components/Select'

interface MediaKitContactProps {
  sectionTitle?: string
  sectionDescription?: string
  stepsTitle?: string
  steps?: string[]
  formLabels?: {
    name?: string
    email?: string
    package?: string
    slot?: string
    message?: string
  }
  formPlaceholders?: {
    name?: string
    email?: string
    slot?: string
    message?: string
  }
  buttonText?: string
  successMessage?: string
}


export default function MediaKitContact({
  sectionTitle = 'Let\'s Work Together',
  sectionDescription = 'Tell me about your brand and let\'s start the collaboration.',
  stepsTitle = 'Next Steps:',
  steps = [
    'Choose your package',
    'Select your preferred slot',
    'Share your campaign goals',
  ],
  formLabels = {
    name: 'Name',
    email: 'Email',
    package: 'Which Package Interests You?',
    slot: 'Ideal Publishing Date',
    message: 'Message',
  },
  formPlaceholders = {
    name: 'Your name',
    email: 'your@email.com',
    slot: 'e.g. mid-month',
    message: 'Tell me about your product, brand, or any questions you have...',
  },
  buttonText = 'Send Message and Start Collaboration',
  successMessage = 'Thank you for your message! I\'ll review your information and get back to you within 24 hours to discuss your campaign.',
}: MediaKitContactProps) {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    package: '',
    slot: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // TODO: Replace with actual form submission endpoint
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        package: '',
        slot: '',
        message: '',
      })
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionParallax id="contact-section" className="ds-media-kit-contact-section" gridSpeed={0.5}>
      <div className="ds-media-kit-contact-container">
        <div className="two-column-layout">
          {/* Left Column: Content */}
          <div className="left-column">
            {/* Section Header */}
            {sectionTitle && (
              <SectionTitle>{sectionTitle}</SectionTitle>
            )}

            {sectionDescription && (
              <p className="ds-section-heading-subtitle">
                {sectionDescription}
              </p>
            )}

          </div>

          {/* Right Column: Contact Form */}
          <div className="right-column">
            {submitStatus === 'success' && (
              <div className="form-message success">
                {successMessage}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="form-message error">
                {errorMessage || 'Something went wrong. Please try again.'}
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Row 1: Name and Email */}
              <div className="form-row">
                <div className="form-field">
                  <Input
                    label={formLabels.name || 'Name'}
                    name="name"
                    type="text"
                    required
                    placeholder={formPlaceholders.name}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <Input
                    label={formLabels.email || 'Email'}
                    name="email"
                    type="email"
                    required
                    placeholder={formPlaceholders.email}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 2: Package and Date */}
              <div className="form-row">
                <div className="form-field">
                  <Select
                    label={formLabels.package || 'Which Package Interests You?'}
                    name="package"
                    placeholder="Select a package"
                    options={[
                      { label: 'Starter Package - $900', value: 'Starter Package - $900' },
                      { label: 'Growth Package - $1,500', value: 'Growth Package - $1,500' },
                      { label: 'Ambassador Package - Custom', value: 'Ambassador Package - Custom' },
                      { label: 'Not sure yet', value: 'Not sure yet' },
                    ]}
                    selected={formData.package}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <Input
                    label={formLabels.slot || 'Ideal Publishing Date'}
                    name="slot"
                    type="text"
                    placeholder={formPlaceholders.slot}
                    value={formData.slot}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="form-field">
                <Textarea
                  label={formLabels.message || 'Message'}
                  name="message"
                  required
                  placeholder={formPlaceholders.message}
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                />
              </div>

              {/* Submit Button */}
              <ButtonPrimary
                type="submit"
                text={isSubmitting ? 'Sending...' : buttonText}
                size="md"
                className="form-submit"
                onClick={undefined}
              />
            </form>
          </div>
        </div>
      </div>
    </SectionParallax>
  )
}















