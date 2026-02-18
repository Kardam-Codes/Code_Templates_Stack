/**
 * FILE.ts
 * OWNER
 *
 * PURPOSE:
 * - Reusable TEMPLATE for hackathons & fast builds
 *
 * YOU SHOULD:
 * - Implement the simplest working version
 * - Keep defaults predictable
 * - Make it reusable across projects
 *
 * DO NOT:
 * - Add business-specific logic
 * - Over-engineer
 * - Optimize prematurely
 *
 * NOTES:
 * - This file can be extended or deleted later
 * - Clarity > Cleverness
 */




/**
 * File: frontend/templates/theme/tokens.js
 *
 * Purpose:
 * This file defines the core design tokens used across the application.
 * Tokens are the base values for colors, spacing, typography, borders, and shadows.
 *
 * Why this exists:
 * Instead of hardcoding values inside components, we use tokens.
 * This makes the UI consistent and allows easy theme switching.
 *
 * Themes like light.js, dark.js, and brand.js will use these tokens.
 *
 * This file is safe, simple, and reusable for hackathon templates.
 */

const tokens = {
  /**
   * Spacing scale
   * Used for padding, margins, and layout gaps
   */
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },

  /**
   * Border radius scale
   * Used for buttons, cards, inputs, modals
   */
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    round: "9999px",
  },

  /**
   * Font sizes
   * Keep minimal and readable
   */
  fontSize: {
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "20px",
    xxl: "24px",
  },

  /**
   * Font weights
   */
  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 600,
  },

  /**
   * Shadows
   * Used for modals, cards, dropdowns
   */
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 2px 6px rgba(0,0,0,0.1)",
    lg: "0 4px 12px rgba(0,0,0,0.15)",
  },

  /**
   * Z-index levels
   * Controls stacking order
   */
  zIndex: {
    base: 1,
    dropdown: 100,
    modal: 1000,
    toast: 1100,
  },

  /**
   * Transition defaults
   * Used for hover effects, modals, theme switching
   */
  transition: {
    fast: "0.15s ease",
    normal: "0.25s ease",
    slow: "0.4s ease",
  },
};

export default tokens;

