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
 * File: frontend/templates/theme/light.js
 *
 * Purpose:
 * This file defines the LIGHT theme of the application.
 * It uses the base tokens and applies light color values.
 *
 * Why this exists:
 * Themes allow the UI to change appearance (light, dark, brand)
 * without modifying individual components.
 *
 * Components should always use theme values, not hardcoded colors.
 *
 * This makes the UI consistent, reusable, and easy to modify.
 */

import tokens from "./tokens";

const lightTheme = {
  name: "light",

  /**
   * Base colors for light mode
   */
  colors: {
    background: "#ffffff",
    surface: "#f9fafb",

    primary: "#2563eb",      // blue
    primaryHover: "#1d4ed8",

    secondary: "#6b7280",    // gray

    text: "#111827",         // main text
    textSecondary: "#6b7280",

    border: "#e5e7eb",

    success: "#16a34a",
    error: "#dc2626",
    warning: "#d97706",
    info: "#0284c7",
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

export default lightTheme;
