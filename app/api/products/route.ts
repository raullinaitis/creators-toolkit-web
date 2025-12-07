import { storefrontQuery } from '@/lib/shopify'
import { GET_PRODUCTS } from '@/lib/queries'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await storefrontQuery<{
      products: {
        edges: Array<{
          node: {
            id: string
            title: string
            handle: string
            description: string
            availableForSale: boolean
            vendor: string
            priceRange: {
              minVariantPrice: {
                amount: string
                currencyCode: string
              }
            }
            images: {
              edges: Array<{
                node: {
                  url: string
                  altText: string | null
                }
              }>
            }
          }
        }>
      }
    }>(GET_PRODUCTS, { first: 250 })

    const products = data.products.edges.map(edge => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      description: edge.node.description,
      available: edge.node.availableForSale,
      vendor: edge.node.vendor,
      price: parseFloat(edge.node.priceRange.minVariantPrice.amount),
      currency: edge.node.priceRange.minVariantPrice.currencyCode,
      image: edge.node.images.edges[0]?.node.url || null,
      imageAlt: edge.node.images.edges[0]?.node.altText || null,
    }))

    return NextResponse.json({ 
      products, 
      count: products.length,
      success: true 
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch products',
        success: false 
      },
      { status: 500 }
    )
  }
}


