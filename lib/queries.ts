/**
 * GraphQL Queries for Shopify Storefront API
 * 
 * These are like asking Shopify specific questions:
 * - "Show me all products"
 * - "Show me one specific product"
 * - "Show me product collections"
 */

// Get all products with basic information
export const GET_PRODUCTS = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          availableForSale
          vendor
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

// Get a single product by its handle (URL-friendly name)
export const GET_PRODUCT_BY_HANDLE = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`;

// Get product collections (like categories)
export const GET_COLLECTIONS = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

// Get shop information
export const GET_SHOP_INFO = `
  query getShopInfo {
    shop {
      name
      description
    }
  }
`;

