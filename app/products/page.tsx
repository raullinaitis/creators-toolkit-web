/**
 * Products List Page
 * 
 * Displays all products from Shopify using ProductCard component
 */

'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components'
import { SectionTitle, SectionParallax } from '@/components'

interface Product {
  id: string
  title: string
  handle: string
  description: string
  available: boolean
  vendor: string
  price: number
  currency: string
  image: string | null
  imageAlt: string | null
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        
        if (data.success) {
          setProducts(data.products)
        } else {
          setError(data.error || 'Failed to fetch products')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="ds-default-background">
        <SectionParallax className="ds-products-page-section" gridSpeed={0.5}>
          <div className="ds-products-page-container">
            <p className="ds-products-loading">Loading products...</p>
          </div>
        </SectionParallax>
      </div>
    )
  }

  if (error) {
    return (
      <div className="ds-default-background">
        <SectionParallax className="ds-products-page-section" gridSpeed={0.5}>
          <div className="ds-products-page-container">
            <h1 className="ds-products-error-title">Error</h1>
            <p className="ds-products-error-message">{error}</p>
            <p className="ds-products-error-hint">
              Make sure your Shopify credentials are configured in .env.local
            </p>
          </div>
        </SectionParallax>
      </div>
    )
  }

  return (
    <div className="ds-default-background">
      <SectionParallax className="ds-products-page-section" gridSpeed={0.5}>
        <div className="ds-products-page-container">
          <SectionTitle>Your Shopify Products</SectionTitle>
          
          <p className="ds-products-count">
            Total: {products.length} products
          </p>

          {products.length === 0 ? (
            <p className="ds-products-empty">
              No products found. Make sure you have products in your Shopify store.
            </p>
          ) : (
            <div className="ds-products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    title: product.title,
                    price: Math.round(product.price * 100), // Convert to cents
                    featuredMedia: product.image || undefined,
                    url: `/product/${product.handle}`,
                    available: product.available,
                    vendor: product.vendor || undefined,
                  }}
                  showVendor={!!product.vendor}
                  showBadge={true}
                  hover={true}
                  imageAspectRatio="4/3"
                />
              ))}
            </div>
          )}
        </div>
      </SectionParallax>
    </div>
  )
}

