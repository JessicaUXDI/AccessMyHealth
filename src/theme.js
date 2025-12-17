// theme.js - Design System Configuration

export const colors = {
  // Primary - trustworthy blue-purple
  primary: '#5B4FE8',
  primaryDark: '#4A3FD1',
  primaryLight: '#8B82F2',
  
  // Secondary - calming green for success/stable
  secondary: '#10B981',
  secondaryLight: '#34D399',
  
  // Neutrals - shades of black
  text: {
    primary: '#000000',
    secondary: '#4B5563',
    tertiary: '#9CA3AF',
  },
  
  // Surfaces
  background: '#F9FAFB',
  card: '#FFFFFF',
  
  // Semantic
  warning: '#F59E0B',
  error: '#EF4444',
  
  // Borders
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
};

export const typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "SF Pro Display", sans-serif',
  
  h1: { 
    fontSize: '24px', 
    fontWeight: 600, 
    lineHeight: 1.3, 
    color: colors.text.primary 
  },
  
  h2: { 
    fontSize: '20px', 
    fontWeight: 600, 
    lineHeight: 1.3, 
    color: colors.text.primary 
  },
  
  h3: { 
    fontSize: '16px', 
    fontWeight: 600, 
    lineHeight: 1.4, 
    color: colors.text.primary 
  },
  
  body: { 
    fontSize: '15px', 
    fontWeight: 400, 
    lineHeight: 1.6, 
    color: colors.text.primary 
  },
  
  bodySmall: { 
    fontSize: '14px', 
    fontWeight: 400, 
    lineHeight: 1.5, 
    color: colors.text.secondary 
  },
  
  caption: { 
    fontSize: '12px', 
    fontWeight: 500, 
    lineHeight: 1.4, 
    color: colors.text.tertiary 
  },
};

export const spacing = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  xxl: '32px',
};

export const borderRadius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const shadows = {
  none: 'none',
  sm: '0 1px 3px rgba(0, 0, 0, 0.04)',
  md: '0 4px 12px rgba(0, 0, 0, 0.08)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
};

export const transitions = {
  fast: '0.1s ease',
  normal: '0.2s ease',
  slow: '0.3s ease',
};

// Touch target sizes (for accessibility)
export const touchTargets = {
  primary: '48px',    // Main actions
  secondary: '40px',  // Secondary actions
  navigation: '44px', // Bottom nav (iOS guideline)
};
