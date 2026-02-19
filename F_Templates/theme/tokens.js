/**
 * FILE: tokens.js
 * OWNER: Misha
 *
 * PURPOSE:
 * Define base design tokens used across all themes.
 *
 * WHY:
 * - Keep spacing, radius, typography consistent
 * - Prevent hardcoding values
 */

export const TOKENS = {
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },

  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },

  font: {
    family: "Inter, Arial, sans-serif",
    size: {
      sm: "12px",
      md: "14px",
      lg: "18px",
      xl: "24px",
    },
  },

  shadow: {
    sm: "0 2px 4px rgba(0,0,0,0.05)",
    md: "0 4px 10px rgba(0,0,0,0.1)",
  },
}
