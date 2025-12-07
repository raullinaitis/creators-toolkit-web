/**
 * Fetch Products from Shopify
 * 
 * Run with: npx tsx scripts/fetch-products.ts
 * Or: npm run fetch-products (if added to package.json)
 */

import { storefrontQuery } from '../lib/shopify'
import { GET_PRODUCTS } from '../lib/queries'

async function fetchProducts() {
  try {
    console.log('🔄 Fetching products from Shopify...\n')
    
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

    console.log('📦 YOUR SHOPIFY PRODUCTS:\n')
    console.log(`Total products: ${products.length}\n`)
    console.log('─'.repeat(80))
    
    products.forEach((product, index) => {
      console.log(`\n${index + 1}. ${product.title}`)
      console.log(`   Handle: ${product.handle}`)
      console.log(`   Price: ${product.currency} ${product.price.toFixed(2)}`)
      console.log(`   Available: ${product.available ? '✅ Yes' : '❌ No'}`)
      console.log(`   Vendor: ${product.vendor || 'N/A'}`)
      if (product.image) {
        console.log(`   Image: ${product.image}`)
      }
      if (product.description) {
        const shortDesc = product.description.substring(0, 100).replace(/\n/g, ' ')
        console.log(`   Description: ${shortDesc}${product.description.length > 100 ? '...' : ''}`)
      }
    })
    
    console.log('\n' + '─'.repeat(80))
    console.log(`\n✅ Successfully fetched ${products.length} products`)
    
    return products
  } catch (error) {
    console.error('\n❌ Error fetching products:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
    }
    throw error
  }
}

// Run if executed directly
if (require.main === module) {
  fetchProducts()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export default fetchProducts


