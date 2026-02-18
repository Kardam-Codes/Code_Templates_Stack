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
 * File: frontend/templates/theme/dark.js
 *
 * Purpose:
 * This file defines the DARK theme of the application.
 * It provides color values optimized for dark mode.
 *
 * Why this exists:
 * Dark mode improves usability in low-light environments
 * and is commonly expected in modern applications.
 *
 * Components should use theme values instead of hardcoded colors,
 * so switching between light and dark themes is seamless.
 *
 * This file reuses tokens for spacing, typography, shadows, etc.
 */

import tokens from "./tokens";

const darkTheme = {
  name: "dark",

  /**
   * Base colors for dark mode
   */
  colors: {
    background: "#111827",      // main background (dark gray)
    surface: "#1f2933",         // cards, modals, panels

    primary: "#3b82f6",         // brighter blue for contrast
    primaryHover: "#2563eb",

    secondary: "#9ca3af",       // light gray

    text: "#f9fafb",            // main text (almost white)
    textSecondary: "#9ca3af",

    border: "#374151",

    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#38bdf8",
  },

  /**
   * Include reusable tokens
   */
  spacing: tokens.spacing,
  radius: tokens.radius,
  fontSize: tokens.fontSize,
  fontWeight: tokens.fontWeight,
  shadow: tokens.shadow,
  zIndex: tokens.zIndex,
  transition: tokens.transition,
};

export default darkTheme;
