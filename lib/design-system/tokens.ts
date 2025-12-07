/**
 * Design System Tokens - TypeScript Definitions & Utilities
 * 
 * Extracted from Shopify Liquid theme (assets/ds-tokens.css)
 * Version: 3.0
 * 
 * This file provides TypeScript type definitions, runtime values,
 * and utility functions for all design tokens in the design system.
 * 
 * Usage in Next.js:
 *   import { tokens, getToken, cssVar } from '@/lib/design-system/tokens'
 *   import '@/app/tokens.css'
 */

/**
 * Token value types
 */
export type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'xxl';
export type FontSize = 'h1' | 'h2' | 'h3' | 'h4' | 'lead' | 'subheadline' | 'body' | 'sm' | 'caption';
export type FontWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
export type BorderRadius = 'sm' | 'md' | 'lg' | 'full';

/**
 * Design Tokens Interface
 */
export interface DesignTokens {
  colors: {
    level1: {
      master: {
        accentPrimary: string;
        accentSecondary: string;
        bgDark: string;
        bgSurface: string;
        bgSurfaceElevated: string;
        borderOpacity: string;
        cardBgOpacity: string;
      };
    };
    level2: {
      semantic: {
        primary: string;
        secondary: string;
        primaryLight: string;
        secondaryLight: string;
        accentCyan: string;
        success: string;
        successBg: string;
        warning: string;
        error: string;
        errorBg: string;
        textDefault: string;
        textSubtle: string;
        textMuted: string;
        textBadgeSecondary: string;
        textBadgeAccent: string;
        textButtonPrimary: string;
        shimmer: string;
      };
    };
    level3: {
      contextual: {
        gradientPrimary: string;
        gradientText: string;
        gradientCard: string;
        gradientFeatured: string;
        gradientSale: string;
        backgroundBase: string;
        backgroundMinimal: string;
        backgroundCardHover: string;
        backgroundBadgeSecondary: string;
        backgroundBadgeAccent: string;
        backgroundBadgeSuccess: string;
        frostedGlassOpacity: string;
        frostedGlassBlur: string;
        frostedGlassBg: string;
        borderDefault: string;
        borderInteractive: string;
        borderFeatured: string;
        borderBadgeSecondary: string;
        borderBadgeAccent: string;
        borderBadgeSuccess: string;
        gradientBgTopLeft: string;
        gradientBgTopRight: string;
        gradientBgCenter: string;
        bgSurface: string;
        bgFlat: string;
        bgOverlay: string;
        overlayBg50: string;
        overlayBg80: string;
        overlayBg95: string;
        colorBlack: string;
        bgGlowOverlay: string;
        bgGlowOverlayMobile: string;
      };
    };
  };
  typography: {
    fonts: {
      body: string;
      display: string;
      displayFamily: string;
      bodyFamily: string;
    };
    sizes: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      lead: string;
      subheadline: string;
      body: string;
      sm: string;
      caption: string;
    };
    weights: {
      light: string;
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
      extrabold: string;
      h1: string;
      h2: string;
      h3: string;
      body: string;
    };
    lineHeights: {
      tight: string;
      normal: string;
      loose: string;
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      lead: string;
      body: string;
      caption: string;
    };
    letterSpacing: {
      wide: string;
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      lead: string;
      body: string;
      caption: string;
    };
    textTransforms: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      lead: string;
      body: string;
      caption: string;
    };
    colors: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      lead: string;
      body: string;
      caption: string;
    };
  };
  spacing: {
    base: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      xxl: string;
      btnYSm: string;
    };
    container: {
      padding: string;
      paddingMobile: string;
      paddingMobileHorizontal: string;
      paddingHorizontal: string;
      maxWidth: string;
      maxWidthNarrow: string;
    };
    section: {
      paddingTop: string;
      paddingBottom: string;
    };
    grid: {
      gapRow: string;
      gapCol: string;
    };
  };
  borders: {
    radius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    widths: {
      default: string;
      md: string;
      card: string;
      accent: string;
      sliderHandle: string;
      thick: string;
    };
  };
  effects: {
    durations: {
      instant: string;
      fast: string;
      base: string;
      slow: string;
    };
    easings: {
      out: string;
      in: string;
      spring: string;
    };
    transitions: {
      base: string;
      hover: string;
      transform: string;
      long: string;
    };
    transforms: {
      lift: string;
      liftXs: string;
      scaleMd: string;
      scaleLg: string;
    };
    shadows: {
      cardLift: string;
      card: string;
      x: string;
      y: string;
      blur: string;
      spread: string;
      color: string;
      opacity: string;
    };
    backdropBlur: string;
    hover: {
      liftAmount: string;
      scaleAmount: string;
      liftAmountAlt: string;
    };
  };
  gradients: {
    type: string;
    angle: string;
    color1: string;
    color2: string;
    color3: string;
    position1: string;
    position2: string;
    position3: string;
    radialPosition: string;
    overlayOpacity: string;
    custom: string;
  };
  sizing: {
    icons: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    cards: {
      flexBasis: string;
      maxWidthSm: string;
      maxWidthMd: string;
      minWidthLogo: string;
      minHeightLogo: string;
      minWidthLogoCard: string;
      maxWidthLogoCard: string;
    };
    forms: {
      inputHeight: string;
      textareaMinHeight: string;
      textareaMaxHeight: string;
      maxWidth: string;
      minWidth: string;
    };
    badges: {
      maxWidthLg: string;
      maxWidthMd: string;
    };
    indicators: {
      sizeSm: string;
    };
    logos: {
      gridSize: string;
      sectionHeight: string;
      gridMaxWidth: string;
      maxHeight: string;
    };
    charts: {
      height: string;
    };
    profile: {
      imageMaxWidth: string;
      imageSizeMobile: string;
    };
    aspectRatio: {
      product: string;
    };
  };
  focus: {
    outlineWidth: string;
    outlineOffset: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    tabletLg: string;
    desktop: string;
  };
}

/**
 * Default Design Token Values
 * These match the values in tokens.css
 */
export const tokens: DesignTokens = {
  colors: {
    level1: {
      master: {
        accentPrimary: '#365ca4',
        accentSecondary: '#57c0de',
        bgDark: '#000000',
        bgSurface: '#0A0F1C',
        bgSurfaceElevated: '#111827',
        borderOpacity: '1',
        cardBgOpacity: '60',
      },
    },
    level2: {
      semantic: {
        primary: 'var(--master-accent-primary)',
        secondary: 'var(--master-accent-secondary)',
        primaryLight: 'color-mix(in srgb, var(--master-accent-primary) 70%, white)',
        secondaryLight: 'color-mix(in srgb, var(--master-accent-secondary) 70%, white)',
        accentCyan: 'var(--master-accent-primary)',
        success: '#10b981',
        successBg: '#103e26',
        warning: '#f59e0b',
        error: '#ef4444',
        errorBg: '#3e1010',
        textDefault: '#e5e5e5',
        textSubtle: '#d1d5db',
        textMuted: '#d1d5db',
        textBadgeSecondary: 'color-mix(in srgb, var(--master-accent-secondary) 80%, white)',
        textBadgeAccent: 'color-mix(in srgb, var(--master-accent-primary) 80%, white)',
        textButtonPrimary: '#e5e5e5',
        shimmer: 'rgba(255, 255, 255, 0.15)',
      },
    },
    level3: {
      contextual: {
        gradientPrimary: 'linear-gradient(135deg, var(--master-accent-primary), var(--master-accent-secondary))',
        gradientText: 'linear-gradient(135deg, var(--master-accent-primary), var(--master-accent-secondary))',
        gradientCard: 'color-mix(in srgb, var(--master-bg-surface) var(--card-bg-opacity, 60%), transparent)',
        gradientFeatured: 'color-mix(in srgb, var(--master-bg-surface) 80%, transparent)',
        gradientSale: '#dc2626',
        backgroundBase: 'var(--master-bg-dark)',
        backgroundMinimal: 'color-mix(in srgb, var(--master-bg-surface) 60%, transparent)',
        backgroundCardHover: 'color-mix(in srgb, var(--master-bg-surface) 70%, transparent)',
        backgroundBadgeSecondary: 'color-mix(in srgb, var(--master-accent-secondary) 20%, transparent)',
        backgroundBadgeAccent: 'color-mix(in srgb, var(--master-accent-primary) 20%, transparent)',
        backgroundBadgeSuccess: 'rgba(16, 185, 129, 0.2)',
        frostedGlassOpacity: '30%',
        frostedGlassBlur: '2px',
        frostedGlassBg: 'color-mix(in srgb, var(--master-bg-surface) var(--frosted-glass-opacity), transparent)',
        borderDefault: 'rgb(55, 65, 81)',
        borderInteractive: 'var(--master-accent-primary)',
        borderFeatured: 'var(--master-accent-primary)',
        borderBadgeSecondary: 'var(--master-accent-secondary)',
        borderBadgeAccent: 'var(--master-accent-primary)',
        borderBadgeSuccess: 'rgb(52, 211, 153)',
        gradientBgTopLeft: 'transparent',
        gradientBgTopRight: 'transparent',
        gradientBgCenter: 'transparent',
        bgSurface: 'rgba(11, 19, 43, 0.75)',
        bgFlat: 'var(--master-bg-dark)',
        bgOverlay: 'rgba(17, 24, 39, 0.5)',
        overlayBg50: 'rgba(0, 0, 0, 0.5)',
        overlayBg80: 'rgba(0, 0, 0, 0.8)',
        overlayBg95: 'rgba(0, 0, 0, 0.95)',
        colorBlack: '#000',
        bgGlowOverlay: 'rgba(10, 10, 26, 0.9)',
        bgGlowOverlayMobile: 'rgba(10, 10, 26, 0.7)',
      },
    },
  },
  typography: {
    fonts: {
      body: "'Outfit', sans-serif",
      display: "'Outfit', sans-serif",
      displayFamily: 'var(--font-display)',
      bodyFamily: 'var(--font-body)',
    },
    sizes: {
      h1: 'clamp(2.25rem, 5.5vw, 3.5rem)',
      h2: 'clamp(1.75rem, 3.5vw, 2.5rem)',
      h3: 'clamp(1.25rem, 2.2vw, 1.5rem)',
      h4: '1.125rem',
      lead: 'clamp(1.125rem, 1.2vw, 1.375rem)',
      subheadline: 'clamp(1.125rem, 1.2vw, 1.375rem)',
      body: 'clamp(1rem, 0.6vw + 0.9rem, 1.125rem)',
      sm: '0.875rem',
      caption: '0.75rem',
    },
    weights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      h1: 'var(--fw-semibold)',
      h2: 'var(--fw-semibold)',
      h3: 'var(--fw-medium)',
      body: 'var(--fw-normal)',
    },
    lineHeights: {
      tight: '1.2',
      normal: '1.6',
      loose: '1.65',
      h1: '1.15',
      h2: '1.2',
      h3: '1.3',
      h4: '1.35',
      lead: '1.6',
      body: '1.6',
      caption: '1.4',
    },
    letterSpacing: {
      wide: '0.05em',
      h1: '0em',
      h2: '0em',
      h3: '0em',
      h4: '0em',
      lead: '0em',
      body: '0em',
      caption: '0.02em',
    },
    textTransforms: {
      h1: 'none',
      h2: 'none',
      h3: 'none',
      h4: 'none',
      lead: 'none',
      body: 'none',
      caption: 'none',
    },
    colors: {
      h1: 'var(--color-text-default)',
      h2: 'var(--color-text-default)',
      h3: 'var(--color-text-default)',
      h4: 'var(--color-text-default)',
      lead: 'var(--color-text-subtle)',
      body: 'var(--color-text-default)',
      caption: 'var(--color-text-muted)',
    },
  },
  spacing: {
    base: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '2.5rem',
      '2xl': '3rem',
      '3xl': '3.5rem',
      xxl: '4rem',
      btnYSm: '0.75rem',
    },
    container: {
      padding: '3rem 1rem',
      paddingMobile: '2rem 0.75rem',
      paddingMobileHorizontal: '0.75rem',
      paddingHorizontal: '1rem',
      maxWidth: '75rem',
      maxWidthNarrow: '50rem',
    },
    section: {
      paddingTop: '3rem',
      paddingBottom: '3rem',
    },
    grid: {
      gapRow: 'var(--space-md)',
      gapCol: 'var(--space-md)',
    },
  },
  borders: {
    radius: {
      sm: '1.5rem',
      md: '2rem',
      lg: '2.5rem',
      full: '9999px',
    },
    widths: {
      default: '1px',
      md: '2px',
      card: '1px',
      accent: '4px',
      sliderHandle: '2px',
      thick: '4px',
    },
  },
  effects: {
    durations: {
      instant: '100ms',
      fast: '200ms',
      base: '300ms',
      slow: '500ms',
    },
    easings: {
      out: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      in: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    transitions: {
      base: 'background-color var(--duration-base) var(--ease-out), border-color var(--duration-base) var(--ease-out), color var(--duration-base) var(--ease-out), opacity var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out)',
      hover: 'all var(--duration-fast) var(--ease-out)',
      transform: 'transform var(--duration-base) var(--ease-spring)',
      long: 'all var(--duration-slow) var(--ease-out)',
    },
    transforms: {
      lift: 'translateY(-6px)',
      liftXs: 'translateY(-3px)',
      scaleMd: 'scale(1.05)',
      scaleLg: 'scale(1.08)',
    },
    shadows: {
      cardLift: '0 15px 30px -10px color-mix(in srgb, var(--master-accent-primary) 30%, transparent)',
      card: 'var(--shadow-card-lift)',
      x: '0px',
      y: '15px',
      blur: '30px',
      spread: '-10px',
      color: '17, 24, 39',
      opacity: '0.3',
    },
    backdropBlur: 'blur(8px)',
    hover: {
      liftAmount: '6px',
      scaleAmount: '1.05',
      liftAmountAlt: '8px',
    },
  },
  gradients: {
    type: 'linear',
    angle: '135deg',
    color1: 'var(--master-accent-primary)',
    color2: 'var(--master-accent-secondary)',
    color3: 'color-mix(in srgb, var(--master-accent-primary) 25%, transparent)',
    position1: '0%',
    position2: '50%',
    position3: '100%',
    radialPosition: '50% 50%',
    overlayOpacity: '0',
    custom: 'var(--gradient-primary)',
  },
  sizing: {
    icons: {
      sm: '16px',
      md: '24px',
      lg: '32px',
      xl: '48px',
      xxl: '64px',
    },
    cards: {
      flexBasis: '17.5rem',
      maxWidthSm: '25rem',
      maxWidthMd: '22.5rem',
      minWidthLogo: '9.375rem',
      minHeightLogo: '5rem',
      minWidthLogoCard: '160px',
      maxWidthLogoCard: '180px',
    },
    forms: {
      inputHeight: '3.4375rem',
      textareaMinHeight: '9.375rem',
      textareaMaxHeight: '15.625rem',
      maxWidth: '25rem',
      minWidth: '20rem',
    },
    badges: {
      maxWidthLg: '12.5rem',
      maxWidthMd: '8.75rem',
    },
    indicators: {
      sizeSm: '0.375rem',
    },
    logos: {
      gridSize: '50px',
      sectionHeight: '50px',
      gridMaxWidth: '1400px',
      maxHeight: '45px',
    },
    charts: {
      height: '12.5rem',
    },
    profile: {
      imageMaxWidth: '31.25rem',
      imageSizeMobile: '12.5rem',
    },
    aspectRatio: {
      product: '4 / 3',
    },
  },
  focus: {
    outlineWidth: '2px',
    outlineOffset: '2px',
  },
  breakpoints: {
    mobile: '600px',
    tablet: '768px',
    tabletLg: '900px',
    desktop: '1024px',
  },
};

/**
 * Helper function to get CSS variable name from token path
 */
export function getCSSVar(path: string): string {
  const varMap: Record<string, string> = {
    'colors.level1.master.accentPrimary': '--master-accent-primary',
    'colors.level1.master.accentSecondary': '--master-accent-secondary',
    'colors.level1.master.bgDark': '--master-bg-dark',
    'colors.level1.master.bgSurface': '--master-bg-surface',
    'colors.level2.semantic.primary': '--color-primary',
    'typography.sizes.h1': '--fs-h1',
    'spacing.base.md': '--space-md',
  };
  return varMap[path] || `--${path.replace(/\./g, '-')}`;
}

/**
 * Helper function to use tokens in React/Next.js with CSS variables
 */
export function useToken(path: string): string {
  const parts = path.split('.');
  let value: any = tokens;
  for (const part of parts) {
    value = value[part];
    if (value === undefined) {
      throw new Error(`Token path not found: ${path}`);
    }
  }
  return typeof value === 'string' ? value : String(value);
}

export default tokens;

