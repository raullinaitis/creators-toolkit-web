/**
 * Media Kit Demographics Component
 * 
 * Converted from Shopify Liquid section to React/Next.js
 * Displays performance charts and demographic bar charts
 */

'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import { ButtonPrimary, Card, SectionTitle, SectionParallax } from '@/components'
import { useCountUp } from '@/hooks/useCountUp'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
  Filler
)

interface DemographicItem {
  name: string
  value: string
  percentage: number
}

interface MediaKitDemographicsProps {
  sectionTitle?: string
  sectionSubtitle?: string
  stat1Value?: string
  stat1Title?: string
  stat1Description?: string
  stat2Value?: string
  stat2Title?: string
  stat2Description?: string
  stat3Value?: string
  stat3Title?: string
  stat3Description?: string
  locationsDescription?: string
  agesDescription?: string
  segmentsDescription?: string
  buttonText?: string
  buttonLink?: string
}


export default function MediaKitDemographics({
  sectionTitle = 'Audience [[Demographics]]',
  sectionSubtitle = 'Based on the last 30 days of verified activity.',
  stat1Value = '11.1M',
  stat1Title = 'Views',
  stat1Description = '30-day visibility across new and returning audiences, verified by platform data.',
  stat2Value = '586K',
  stat2Title = 'Link Clicks',
  stat2Description = 'Clicks that convert curiosity into action — 11.7K unique visitors in 30 days.',
  stat3Value = '7.79%',
  stat3Title = 'Engagement',
  stat3Description = 'Overall interaction rate across posts and stories; category average sits between 1.2–6.5%.',
  locationsDescription = 'Global presence led by North America and Europe, strong reach across key markets.',
  agesDescription = 'Millennial-majority audience with strong Gen Z and Gen X reach across key brackets.',
  segmentsDescription = 'Creators and product teams drive the highest engagement and innovation across segments.',
  buttonText = 'See the Case Studies',
  buttonLink = '#',
}: MediaKitDemographicsProps) {

  // Chart data - Latest performance data
  const viewsData = [
    { x: '2024-09-01', y: 213482 },
    { x: '2024-09-02', y: 241709 },
    { x: '2024-09-03', y: 274621 },
    { x: '2024-09-04', y: 333947 },
    { x: '2024-09-05', y: 421583 },
    { x: '2024-09-06', y: 972154 },
    { x: '2024-09-07', y: 1018743 },
    { x: '2024-09-08', y: 688912 },
    { x: '2024-09-09', y: 482376 },
    { x: '2024-09-10', y: 372419 },
    { x: '2024-09-11', y: 345287 },
    { x: '2024-09-12', y: 309842 },
    { x: '2024-09-13', y: 297105 },
    { x: '2024-09-14', y: 282431 },
    { x: '2024-09-15', y: 267119 },
    { x: '2024-09-16', y: 252387 },
    { x: '2024-09-17', y: 272914 },
    { x: '2024-09-18', y: 301602 },
    { x: '2024-09-19', y: 362748 },
    { x: '2024-09-20', y: 414928 },
    { x: '2024-09-21', y: 459317 },
    { x: '2024-09-22', y: 821946 },
    { x: '2024-09-23', y: 933201 },
    { x: '2024-09-24', y: 1046725 },
    { x: '2024-09-25', y: 878563 },
    { x: '2024-09-26', y: 642871 },
    { x: '2024-09-27', y: 482319 },
    { x: '2024-09-28', y: 431506 },
    { x: '2024-09-29', y: 392174 },
    { x: '2024-09-30', y: 366905 }
  ]

  const clicksData = [
    { x: '2024-09-01', y: 9621 },
    { x: '2024-09-02', y: 10873 },
    { x: '2024-09-03', y: 12264 },
    { x: '2024-09-04', y: 14728 },
    { x: '2024-09-05', y: 19142 },
    { x: '2024-09-06', y: 48927 },
    { x: '2024-09-07', y: 53412 },
    { x: '2024-09-08', y: 36283 },
    { x: '2024-09-09', y: 23475 },
    { x: '2024-09-10', y: 18364 },
    { x: '2024-09-11', y: 16219 },
    { x: '2024-09-12', y: 14208 },
    { x: '2024-09-13', y: 13357 },
    { x: '2024-09-14', y: 12643 },
    { x: '2024-09-15', y: 12018 },
    { x: '2024-09-16', y: 11852 },
    { x: '2024-09-17', y: 12573 },
    { x: '2024-09-18', y: 13984 },
    { x: '2024-09-19', y: 15612 },
    { x: '2024-09-20', y: 17643 },
    { x: '2024-09-21', y: 20028 },
    { x: '2024-09-22', y: 37916 },
    { x: '2024-09-23', y: 42305 },
    { x: '2024-09-24', y: 47219 },
    { x: '2024-09-25', y: 39864 },
    { x: '2024-09-26', y: 28342 },
    { x: '2024-09-27', y: 20718 },
    { x: '2024-09-28', y: 18261 },
    { x: '2024-09-29', y: 16742 },
    { x: '2024-09-30', y: 15328 }
  ]

  const engagementData = [
    { x: '2024-09-01', y: 4.51 },
    { x: '2024-09-02', y: 4.50 },
    { x: '2024-09-03', y: 4.47 },
    { x: '2024-09-04', y: 4.41 },
    { x: '2024-09-05', y: 4.54 },
    { x: '2024-09-06', y: 5.03 },
    { x: '2024-09-07', y: 5.24 },
    { x: '2024-09-08', y: 5.27 },
    { x: '2024-09-09', y: 4.86 },
    { x: '2024-09-10', y: 4.93 },
    { x: '2024-09-11', y: 4.70 },
    { x: '2024-09-12', y: 4.59 },
    { x: '2024-09-13', y: 4.49 },
    { x: '2024-09-14', y: 4.48 },
    { x: '2024-09-15', y: 4.50 },
    { x: '2024-09-16', y: 4.69 },
    { x: '2024-09-17', y: 4.61 },
    { x: '2024-09-18', y: 4.64 },
    { x: '2024-09-19', y: 4.30 },
    { x: '2024-09-20', y: 4.25 },
    { x: '2024-09-21', y: 4.36 },
    { x: '2024-09-22', y: 4.61 },
    { x: '2024-09-23', y: 4.53 },
    { x: '2024-09-24', y: 4.51 },
    { x: '2024-09-25', y: 4.54 },
    { x: '2024-09-26', y: 4.41 },
    { x: '2024-09-27', y: 4.29 },
    { x: '2024-09-28', y: 4.23 },
    { x: '2024-09-29', y: 4.27 },
    { x: '2024-09-30', y: 4.18 }
  ]

  // Demographic data
  const locationsData: DemographicItem[] = [
    { name: 'United States', value: '28.1%', percentage: 28.1 },
    { name: 'Canada', value: '12.7%', percentage: 12.7 },
    { name: 'Germany', value: '11.9%', percentage: 11.9 },
    { name: 'United Kingdom', value: '8.1%', percentage: 8.1 },
    { name: 'India', value: '6.3%', percentage: 6.3 },
  ]

  const agesData: DemographicItem[] = [
    { name: '13–17', value: '2%', percentage: 2 },
    { name: '18–24', value: '16.6%', percentage: 16.6 },
    { name: '25–34', value: '43.8%', percentage: 43.8 },
    { name: '35–44', value: '21.0%', percentage: 21.0 },
    { name: '45–54', value: '7.0%', percentage: 7.0 },
  ]

  const segmentsData: DemographicItem[] = [
    { name: 'Creators', value: '32.6%', percentage: 32.6 },
    { name: 'Product Teams', value: '25.0%', percentage: 25.0 },
    { name: 'AI Tech', value: '20.1%', percentage: 20.1 },
    { name: 'Other', value: '8.3%', percentage: 8.3 },
    { name: 'Agencies', value: '5.9%', percentage: 5.9 },
  ]

  // Get CSS variables for colors
  const getChartColors = () => {
    if (typeof window === 'undefined') {
      // Use CSS variable names as fallback - will be resolved by browser
      return { startColor: 'var(--master-accent-primary)', endColor: 'var(--master-accent-secondary)' }
    }
    const rootStyles = getComputedStyle(document.documentElement)
    return {
      startColor: rootStyles.getPropertyValue('--master-accent-primary').trim() || rootStyles.getPropertyValue('--master-accent-primary'),
      endColor: rootStyles.getPropertyValue('--master-accent-secondary').trim() || rootStyles.getPropertyValue('--master-accent-secondary'),
    }
  }

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: typeof window !== 'undefined' 
        ? parseInt(getComputedStyle(document.documentElement).getPropertyValue('--duration-chart-animation').trim().replace('ms', '')) || 2500
        : 2500,
      easing: 'easeInOutQuart' as const,
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    scales: {
      x: {
        type: 'time' as const,
        time: { unit: 'day' as const, displayFormats: { day: 'MMM d' } },
        grid: { display: false },
        ticks: {
          color: typeof window !== 'undefined' 
            ? getComputedStyle(document.documentElement).getPropertyValue('--color-text-muted').trim() || 'var(--color-text-muted)'
            : 'var(--color-text-muted)',
          maxTicksLimit: 6,
        },
      },
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: {
          color: typeof window !== 'undefined' 
            ? getComputedStyle(document.documentElement).getPropertyValue('--color-text-muted').trim() || 'var(--color-text-muted)'
            : 'var(--color-text-muted)',
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: typeof window !== 'undefined' 
          ? getComputedStyle(document.documentElement).getPropertyValue('--master-bg-surface-elevated').trim() || 'var(--master-bg-surface-elevated)'
          : 'var(--master-bg-surface-elevated)',
        titleColor: typeof window !== 'undefined' 
          ? getComputedStyle(document.documentElement).getPropertyValue('--color-text-default').trim() || 'var(--color-text-default)'
          : 'var(--color-text-default)',
        bodyColor: typeof window !== 'undefined' 
          ? getComputedStyle(document.documentElement).getPropertyValue('--color-text-default').trim() || 'var(--color-text-default)'
          : 'var(--color-text-default)',
        borderColor: getChartColors().startColor,
        borderWidth: 1,
        displayColors: false,
        cornerRadius: 8,
        padding: 12,
      },
    },
  }

  // Handle smooth scroll for anchor links
  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ block: 'start' })
      }
    }
  }

  return (
    <SectionParallax id="demographics-section" className="ds-media-kit-demographics-section" gridSpeed={0.5}>
      <div className="ds-media-kit-demographics-container">
        {/* Section Header */}
        {sectionTitle && (
          <SectionTitle>{sectionTitle}</SectionTitle>
        )}

        {sectionSubtitle && (
          <p className="ds-section-heading-subtitle">
            {sectionSubtitle}
          </p>
        )}

        {/* Performance Chart Cards */}
        <PerformanceCardsGrid
          stat1Value={stat1Value}
          stat1Title={stat1Title}
          stat1Description={stat1Description}
          viewsData={viewsData}
          stat2Value={stat2Value}
          stat2Title={stat2Title}
          stat2Description={stat2Description}
          clicksData={clicksData}
          stat3Value={stat3Value}
          stat3Title={stat3Title}
          stat3Description={stat3Description}
          engagementData={engagementData}
          chartOptions={chartOptions}
          getChartColors={getChartColors}
        />

        {/* Demographic Cards */}
        <div className="chart-grid">
          {/* Top Locations */}
          <DemographicCard
            title="Top Locations"
            description={locationsDescription}
            items={locationsData}
          />

          {/* Age Ranges */}
          <DemographicCard
            title="Age Ranges"
            description={agesDescription}
            items={agesData}
          />

          {/* Audience Segments */}
          <DemographicCard
            title="Audience Segments"
            description={segmentsDescription}
            items={segmentsData}
          />
        </div>

      </div>
    </SectionParallax>
  )
}

// Performance Cards Grid Component with Scroll Animation
interface PerformanceCardsGridProps {
  stat1Value: string
  stat1Title?: string
  stat1Description?: string
  viewsData: Array<{ x: string; y: number }>
  stat2Value: string
  stat2Title?: string
  stat2Description?: string
  clicksData: Array<{ x: string; y: number }>
  stat3Value: string
  stat3Title?: string
  stat3Description?: string
  engagementData: Array<{ x: string; y: number }>
  chartOptions: any
  getChartColors: () => { startColor: string; endColor: string }
}

function PerformanceCardsGrid({
  stat1Value,
  stat1Title,
  stat1Description,
  viewsData,
  stat2Value,
  stat2Title,
  stat2Description,
  clicksData,
  stat3Value,
  stat3Title,
  stat3Description,
  engagementData,
  chartOptions,
  getChartColors,
}: PerformanceCardsGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '50px'
      }
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="chart-grid" ref={containerRef}>
      {/* Views Card */}
      <Card className={`performance-card ${isVisible ? 'is-visible' : ''}`} hover>
        <h3 className="performance-title">
          <StatNumber value={stat1Value} /> <span>{stat1Title}</span>
        </h3>
        <p className="performance-description">{stat1Description}</p>
        <div className="performance-chart">
          <Line
            data={{
              datasets: [{
                data: viewsData,
                fill: true,
                tension: 0.3,
                pointRadius: 0,
                borderWidth: 2,
                borderColor: getChartColors().startColor,
                backgroundColor: `color-mix(in srgb, ${getChartColors().startColor}, transparent 90%)`,
              }],
            }}
            options={{
              ...chartOptions,
              scales: {
                ...chartOptions.scales,
                y: {
                  ...chartOptions.scales.y,
                  max: 1200000,
                  ticks: {
                    ...chartOptions.scales.y.ticks,
                    callback: function(value) {
                      const numValue = Number(value)
                      if (numValue >= 1000000) {
                        return (numValue / 1000000).toFixed(1) + 'M'
                      }
                      return (numValue / 1000) + 'K'
                    },
                  },
                },
              },
              plugins: {
                ...chartOptions.plugins,
                tooltip: {
                  ...chartOptions.plugins.tooltip,
                  callbacks: {
                    title: function(context: any) {
                      const date = new Date(context[0].parsed.x)
                      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    },
                    label: function(context: any) {
                      const value = context.parsed.y
                      return value.toLocaleString() + ' views'
                    },
                  },
                },
              },
            }}
          />
        </div>
      </Card>

      {/* Link Clicks Card */}
      <Card className={`performance-card ${isVisible ? 'is-visible' : ''}`} hover>
        <h3 className="performance-title">
          <StatNumber value={stat2Value} /> <span>{stat2Title}</span>
        </h3>
        <p className="performance-description">{stat2Description}</p>
        <div className="performance-chart">
          <Line
            data={{
              datasets: [{
                data: clicksData,
                fill: true,
                tension: 0.3,
                pointRadius: 0,
                borderWidth: 2,
                borderColor: getChartColors().startColor,
                backgroundColor: `color-mix(in srgb, ${getChartColors().startColor}, transparent 90%)`,
              }],
            }}
            options={{
              ...chartOptions,
              scales: {
                ...chartOptions.scales,
                y: {
                  ...chartOptions.scales.y,
                  max: 60000,
                  ticks: {
                    ...chartOptions.scales.y.ticks,
                    callback: function(value) {
                      return (Number(value) / 1000) + 'K'
                    },
                  },
                },
              },
              plugins: {
                ...chartOptions.plugins,
                tooltip: {
                  ...chartOptions.plugins.tooltip,
                  callbacks: {
                    title: function(context: any) {
                      const date = new Date(context[0].parsed.x)
                      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    },
                    label: function(context: any) {
                      const value = context.parsed.y
                      return value.toLocaleString() + ' clicks'
                    },
                  },
                },
              },
            }}
          />
        </div>
      </Card>

      {/* Engagement Card */}
      <Card className={`performance-card ${isVisible ? 'is-visible' : ''}`} hover>
        <h3 className="performance-title">
          <StatNumber value={stat3Value} /> <span>{stat3Title}</span>
        </h3>
        <p className="performance-description">{stat3Description}</p>
        <div className="performance-chart">
          <Line
            data={{
              datasets: [{
                data: engagementData,
                fill: true,
                tension: 0.3,
                pointRadius: 0,
                borderWidth: 2,
                borderColor: getChartColors().startColor,
                backgroundColor: `color-mix(in srgb, ${getChartColors().startColor}, transparent 90%)`,
              }],
            }}
            options={{
              ...chartOptions,
              scales: {
                ...chartOptions.scales,
                y: {
                  ...chartOptions.scales.y,
                  min: 4,
                  max: 6,
                  ticks: {
                    ...chartOptions.scales.y.ticks,
                    callback: function(value) {
                      return value + '%'
                    },
                  },
                },
              },
              plugins: {
                ...chartOptions.plugins,
                tooltip: {
                  ...chartOptions.plugins.tooltip,
                  callbacks: {
                    title: function(context: any) {
                      const date = new Date(context[0].parsed.x)
                      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    },
                    label: function(context: any) {
                      const value = context.parsed.y
                      return value + '% engagement'
                    },
                  },
                },
              },
            }}
          />
        </div>
      </Card>
    </div>
  )
}

// Stat Number Component with Count-Up Animation
interface StatNumberProps {
  value: string
}

function StatNumber({ value }: StatNumberProps) {
  const { value: animatedValue, ref } = useCountUp(value, { duration: 2500, delay: 200 })
  return <span ref={ref}>{animatedValue}</span>
}

// Demographic Card Component
interface DemographicCardProps {
  title: string
  description: string
  items: DemographicItem[]
}

function DemographicCard({ title, description, items }: DemographicCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.1, rootMargin: '50px' })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Card className={`demographic-card ${isVisible ? 'is-visible' : ''}`} hover ref={ref}>
      <h3 className="demographic-title">{title}</h3>
      <p className="demographic-description">{description}</p>
      {items.map((item, index) => (
        <div key={index} className="demographic-item">
          <div className="demographic-label">
            <span className="demographic-name">{item.name}</span>
            <span className="demographic-value">{item.value}</span>
          </div>
          <div className="demographic-bar">
            <div
              className="demographic-fill"
              style={{ 
                width: isVisible ? `${item.percentage}%` : '0%',
                transition: `width var(--duration-bar-animation) var(--ease-smooth) calc(var(--delay-bar-stagger) * ${index})`,
                animation: 'none',
                willChange: 'width'
              } as React.CSSProperties}
            />
          </div>
        </div>
      ))}
    </Card>
  )
}
