import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './tokens.css'
import '../components/components.css'
import { NavBar, Footer } from '@/components'
import SectionTitleProcessor from '@/components/SectionTitleProcessor'
import ParallaxBackground from '@/components/ParallaxBackground'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Headless Shopify Store',
  description: 'Your clean slate headless Shopify storefront',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <ParallaxBackground speed={0.25} />
        <NavBar />
        <SectionTitleProcessor />
        {children}
        <Footer />
      </body>
    </html>
  )
}
