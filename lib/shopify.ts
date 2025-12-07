/**
 * Shopify Storefront API Client
 * 
 * This file sets up the connection between your frontend and Shopify's backend.
 * Think of it like a bridge that lets your website talk to Shopify's servers.
 */

import { createStorefrontClient } from '@shopify/hydrogen-react';

// Get your Shopify credentials from environment variables
// These are like your login credentials - you'll get them from Shopify admin
const storeDomain = process.env.NEXT_PUBLIC_STORE_DOMAIN || '';
const publicStorefrontToken = process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN || '';
// Private token is optional - only use it for server-side operations
const privateStorefrontToken = process.env.PRIVATE_STOREFRONT_API_TOKEN;

// Create the client that will handle all communication with Shopify
export const shopifyClient = createStorefrontClient({
  storeDomain: storeDomain,
  publicStorefrontToken: publicStorefrontToken,
  privateStorefrontToken: privateStorefrontToken,
});

/**
 * Helper function to make GraphQL queries to Shopify
 * 
 * This is like sending a question to Shopify and getting an answer back.
 * For example: "Show me all products" or "What's the price of this item?"
 * 
 * By default, uses the public token (safe for both client and server).
 * Set usePrivateToken=true for server-side operations that need more permissions.
 */
export async function storefrontQuery<T>(
  query: string, 
  variables: Record<string, any> = {},
  usePrivateToken: boolean = false
): Promise<T> {
  // Use private token only on server-side for sensitive operations
  const headers = usePrivateToken && privateStorefrontToken
    ? shopifyClient.getPrivateTokenHeaders()
    : shopifyClient.getPublicTokenHeaders();

  const response = await fetch(shopifyClient.getStorefrontApiUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const json = await response.json();
  
  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data as T;
}

