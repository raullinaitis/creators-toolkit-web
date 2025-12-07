/**
 * Design System Token Utilities
 * 
 * Helper functions for working with design tokens in React components
 */

import React from 'react'

/**
 * Get a CSS variable value from the document root
 */
export function getToken(variableName: string): string {
  if (typeof window === 'undefined') {
    return '';
  }
  
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(variableName).trim();
  return value || '';
}

/**
 * Set a CSS variable value on the document root
 */
export function setToken(variableName: string, value: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  document.documentElement.style.setProperty(variableName, value);
}

/**
 * Parse gradient accent syntax from text
 * Converts [[text]] to <span className="gradient-accent">text</span>
 */
export function parseGradientAccent(text: string): (string | React.ReactElement)[] {
  if (!text) return [];
  
  const parts = text.split(/(\[\[.*?\]\])/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('[[') && part.endsWith(']]')) {
      const content = part.slice(2, -2);
      return React.createElement('span', { key: index, className: 'gradient-accent' }, content);
    }
    return part;
  });
}

/**
 * Parse mobile-only line breaks
 * Converts <br class="mobile-only"> to React elements
 */
export function parseMobileLineBreaks(text: string): (string | React.ReactElement)[] {
  if (!text) return [];
  
  const parts = text.split(/(<br\s+class="mobile-only"\s*\/?>)/gi);
  
  return parts.map((part, index) => {
    if (/<br\s+class="mobile-only"\s*\/?>/gi.test(part)) {
      return React.createElement('br', { key: index, className: 'mobile-only' });
    }
    return part;
  });
}

/**
 * Parse both gradient accents and mobile line breaks
 */
export function parseTextFeatures(text: string): (string | React.ReactElement)[] {
  if (!text) return [];
  
  // First parse mobile line breaks
  const withBreaks = parseMobileLineBreaks(text);
  
  // Then parse gradient accents in each part
  return withBreaks.flatMap((part, index) => {
    if (typeof part === 'string') {
      return parseGradientAccent(part).map((subPart, subIndex) => {
        if (React.isValidElement(subPart)) {
          return React.cloneElement(subPart, { key: `${index}-${subIndex}` });
        }
        return subPart;
      });
    }
    return part;
  });
}

/**
 * Get token value as a number (for calculations)
 */
export function getTokenNumber(variableName: string): number {
  const value = getToken(variableName);
  if (!value) return 0;
  
  // Extract number from value (handles units like "px", "rem", etc.)
  const match = value.match(/(\d+\.?\d*)/);
  return match ? parseFloat(match[1]) : 0;
}

/**
 * Get spacing token value
 */
export function getSpacingToken(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'xxl'): string {
  return `var(--space-${size})`;
}

/**
 * Get color token value
 */
export function getColorToken(color: string): string {
  return `var(--color-${color})`;
}

/**
 * Get typography token value
 */
export function getTypographyToken(property: string): string {
  return `var(--${property})`;
}

/**
 * Create CSS custom property string for inline styles
 */
export function cssVar(variableName: string): string {
  return `var(${variableName})`;
}

