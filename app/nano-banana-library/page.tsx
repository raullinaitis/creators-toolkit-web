/**
 * Nano Banana Library Page
 *
 * Sales page for the Nano Banana Library
 * Custom hero section with video masterclass
 */

import PromptPackHero from '@/components/PromptPackHero'
import MediaKitLogos from '@/components/MediaKitLogos'
import MediaKitDemographics from '@/components/MediaKitDemographics'
import MediaKitCaseStudies from '@/components/MediaKitCaseStudies'
import MediaKitPricing from '@/components/MediaKitPricing'
import MediaKitAboutV2 from '@/components/MediaKitAboutV2'
import MediaKitAvailability from '@/components/MediaKitAvailability'
import MediaKitFAQ from '@/components/MediaKitFAQ'
import MediaKitContact from '@/components/MediaKitContact'
import { BackToTop } from '@/components'

export const metadata = {
  title: 'Nano Banana Library | Creators Toolkit',
  description: 'Stop gambling with generative AI. Take total visual control with the Nano Banana Library.',
}

// Sample logo data - replace with actual data from CMS/API
const sampleLogos = [
  { id: '1', brandName: 'Emergent', logoUrl: '/images/01. client logo_emergent.png', logoAlt: 'Emergent logo' },
  { id: '2', brandName: 'InVideo', logoUrl: '/images/02. client_logo_INVIDEO.png', logoAlt: 'InVideo logo' },
  { id: '3', brandName: 'OpusClip', logoUrl: '/images/03. client_logo_OPUSCLIP.png', logoAlt: 'OpusClip logo' },
  { id: '4', brandName: 'Filmora', logoUrl: '/images/04. client_logo_FILMORA.png', logoAlt: 'Filmora logo' },
  { id: '5', brandName: 'Freepik', logoUrl: '/images/05, client_logo_FREEPIK.png', logoAlt: 'Freepik logo' },
  { id: '6', brandName: 'Pictory', logoUrl: '/images/06. client logo_pictory.png', logoAlt: 'Pictory logo' },
  { id: '7', brandName: 'Nanlite', logoUrl: '/images/client logo_nanlite.png', logoAlt: 'Nanlite logo' },
  { id: '8', brandName: 'Pacdora', logoUrl: '/images/client logo_pacdora.png', logoAlt: 'Pacdora logo' },
  { id: '9', brandName: 'Smallrig', logoUrl: '/images/client logo_smallrig.png', logoAlt: 'Smallrig logo' },
  { id: '10', brandName: 'Zhiyun', logoUrl: '/images/client logo_zhiyun.png', logoAlt: 'Zhiyun logo' },
  { id: '11', brandName: 'Aputure', logoUrl: '/images/client_logo_aputure.png', logoAlt: 'Aputure logo' },
  { id: '12', brandName: 'Smallrig', logoUrl: '/images/client_logo_SMALLRIG.png', logoAlt: 'Smallrig logo' },
]

// Sample case studies data - replace with actual data from CMS/API
const sampleCaseStudies = [
  {
    id: '1',
    brandName: 'SET A LIGHT 3D',
    brandSubtitle: '',
    description: 'Made lighting look simple and viral in a split BTS tutorial.',
    goal: 'Brand awareness',
    result: 'A long-term collaboration',
    views: '14.7M Organic Reach',
    caseVideo: 'https://cdn.shopify.com/videos/c/o/v/1a22b019855b434b99825fa92ec56317.mp4',
  },
  {
    id: '2',
    brandName: 'MESHY AI',
    brandSubtitle: '',
    description: 'Turned a new 3D feature launch into a clear, viral how-to story.',
    goal: 'Product launch visibility',
    result: 'An ongoing partnership',
    views: '4M Organic Reach',
    caseVideo: 'https://cdn.shopify.com/videos/c/o/v/1f9e7e60fc3e4d04b8b722a817991c1b.mp4',
  },
  {
    id: '3',
    brandName: 'FREEPIK',
    brandSubtitle: '',
    description: 'Showed how one platform can unite every AI tool.',
    goal: 'Platform positioning',
    result: 'High creator engagement',
    views: '490K Organic Reach',
    caseVideo: 'https://cdn.shopify.com/videos/c/o/v/c5d773bceb924689a47ccecbd5e8d2ca.mp4',
  },
  {
    id: '4',
    brandName: 'OPUS PRO',
    brandSubtitle: '',
    description: 'Presented an easy AI powered way for short-form conversions.',
    goal: 'Product demonstration',
    result: 'Strong viewer retention',
    views: '389K Organic Reach',
    caseVideo: 'https://cdn.shopify.com/videos/c/o/v/bc5bbf7ab66341e9a090e823afdce506.mp4',
  },
  {
    id: '5',
    brandName: 'VERSATRAYS',
    brandSubtitle: '',
    description: 'Used a classical BTS to turn my own product launch into a success.',
    goal: 'Product launch',
    result: 'Significant sales growth',
    views: '721K Organic Reach',
    caseVideo: 'https://cdn.shopify.com/videos/c/o/v/3b2beb816bf142b5b91d3c9bf03a0b5d.mp4',
  },
]

// Sample pricing packages - replace with actual data from CMS/API
const samplePricingPackages = [
  {
    name: 'Starter',
    price: '$900',
    subtext: 'Perfect for brands testing partnerships',
    features: [
      {
        title: '1 short-form video + 1 story',
        description: 'Strategic content mix across feed and stories for balanced visibility.',
      },
      {
        title: '3-day turnaround',
        description: 'Fast, lightweight execution for quick delivery.',
      },
      {
        title: '14-day DM automation',
        description: 'Automated follow-up that turns interest into customer conversation.',
      },
      {
        title: 'Basic campaign report',
        description: 'Core reach and engagement metrics included.',
      },
    ],
    buttonText: 'Select Starter',
    buttonLink: '#contact-section',
    isPopular: false,
  },
  {
    name: 'Growth',
    price: '$1,500',
    subtext: 'Data-driven optimization for sustained growth',
    features: [
      {
        title: '2 short-form videos + 2 stories',
        description: 'Multi-format campaign for sustained visibility and engagement.',
      },
      {
        title: '30-day DM automation',
        description: 'Extended nurturing sequence that maximizes conversion over time.',
      },
      {
        title: 'Insights and review',
        description: 'Continuous performance refinement for upcoming content.',
      },
      {
        title: 'Premium support',
        description: 'Direct access to strategic guidance and campaign optimization.',
      },
    ],
    buttonText: 'Select Growth',
    buttonLink: '#contact-section',
    badgeText: 'Most Popular',
    isPopular: true,
  },
  {
    name: 'Ambassador',
    price: 'Custom',
    subtext: 'Full-scale partnership for category leadership',
    features: [
      {
        title: 'Full brand placement or 3+ slots',
        description: 'Comprehensive strategy with integration and creative freedom.',
      },
      {
        title: 'Unlimited DM automation',
        description: 'Automated journey management with personalized sequences for every stage.',
      },
      {
        title: 'Exclusivity',
        description: 'Dedicated partnership with ongoing optimization and priority analytics.',
      },
      {
        title: 'Priority analytics and reporting',
        description: 'Advanced insights with 24/7 support and creative collaboration.',
      },
    ],
    buttonText: 'Contact Sales',
    buttonLink: '#contact-section',
    isPopular: false,
  },
]

// Sample about section data
const sampleAboutData = {
  sectionTitle: 'The [[Creator]] Behind',
  sectionSubtitle: 'I combine craft, insight, and consistency to make content that keeps performing.',
  profileImage: '/images/PROFILE 2025.png',
  profileImageAlt: 'Profile photo',
  socialLinks: [
    {
      platform: 'instagram' as const,
      url: 'https://www.instagram.com/raullinaitis/',
      label: 'Follow on Instagram',
    },
    {
      platform: 'youtube' as const,
      url: 'https://youtube.com/raullinaitis',
      label: 'Subscribe on YouTube',
    },
    {
      platform: 'tiktok' as const,
      url: 'https://www.tiktok.com/@raullinaittis',
      label: 'Follow on TikTok',
    },
    {
      platform: 'whatsapp' as const,
      url: 'https://wa.me/37064766015',
      label: 'Message on WhatsApp',
    },
  ],
  contentBlocks: [
    {
      title: 'How I Work',
      content: 'Every campaign starts with a plan. I combine structure with creativity so the content looks sharp and performs.',
    },
    {
      title: 'The Approach',
      content: 'Blending filmmaking craft with strategic thinking, I turn ideas into systems that deliver repeatable results.',
    },
    {
      title: 'The Mindset',
      content: 'I build for longevity, not luck. The goal isn\'t viral moments — it\'s consistent relevance.',
    },
  ],
}

// Sample availability data
const sampleAvailabilityMonths = [
  {
    month: 'October',
    slotsAvailable: 2,
    isOpen: true,
  },
  {
    month: 'November',
    slotsAvailable: 1,
    isOpen: true,
  },
  {
    month: 'December',
    slotsAvailable: 0,
    isOpen: false,
  },
]

// Sample FAQ data
const sampleFAQs = [
  {
    question: 'How do campaigns perform?',
    answer: 'Campaigns focus on awareness, visibility, and reach — with transparent engagement reports.',
    defaultOpen: false,
  },
  {
    question: 'What if a video underperforms?',
    answer: 'Each post is optimized post-launch; strategy adjusts in real time for best results.',
    defaultOpen: false,
  },
  {
    question: 'Do you offer exclusivity?',
    answer: 'Yes — I don\'t feature competing brands during active partnerships.',
    defaultOpen: false,
  },
  {
    question: 'How involved do I need to be?',
    answer: 'You can stay hands-on or let me handle full creative direction. The process stays simple and efficient.',
    defaultOpen: false,
  },
  {
    question: 'What platforms are posts live on?',
    answer: 'Campaigns are published across the most relevant social channels based on audience data and creative fit.',
    defaultOpen: false,
  },
  {
    question: 'Do I get the video files?',
    answer: 'Yes — all deliverables are shared for your own use and future repurposing.',
    defaultOpen: false,
  },
]

export default function NanoBananaLibraryPage() {
  return (
    <div className="ds-default-background">
      <PromptPackHero
        eyebrowText="⚡ Optimized for Nano Banana"
        headline={'Stop Gambling with AI\n[[Take Total Visual Control]]'}
        subheadline="Stop hoping for a lucky result. Watch the free masterclass below to learn the workflow, then unlock the system that gives you pro-level results every time"
        videoEmbedUrl="https://youtu.be/AeBOzler4nE"
        buttonText="Get the Dashboard ($19)"
        buttonLink="#pricing-section"
      />
      <MediaKitLogos logos={sampleLogos} />
      <MediaKitDemographics buttonLink="#results-section" />
      <MediaKitCaseStudies caseStudies={sampleCaseStudies} />
      <MediaKitPricing packages={samplePricingPackages} />
      <div id="about-section">
        <MediaKitAboutV2 {...sampleAboutData} />
      </div>
      <div id="availability-section">
        <MediaKitAvailability months={sampleAvailabilityMonths} />
      </div>
      <div id="faq-section">
        <MediaKitFAQ faqs={sampleFAQs} />
      </div>
      <MediaKitContact />
      <BackToTop />
    </div>
  )
}