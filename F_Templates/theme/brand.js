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
 * File: frontend/templates/theme/brand.js
 *
 * Purpose:
 * This file defines the BRAND theme of the application.
 * This allows hackathon teams to quickly customize the UI
 * to match their project identity, sponsor colors, or demo style.
 *
 * You can modify these colors without changing components.
 *
 * This theme is optional but useful for demos and presentations.
 */

import tokens from "./tokens";

const brandTheme = {
  name: "brand",

  /**
   * Brand-specific colors
   * You can change primary color to match your project
   */
  colors: {
    background: "#f8fafc",
    surface: "#ffffff",

    primary: "#7c3aed",        // purple brand color
    primaryHover: "#6d28d9",

    secondary: "#475569",

    text: "#0f172a",
    textSecondary: "#64748b",

    border: "#e2e8f0",

    success: "#16a34a",
    error: "#dc2626",
    warning: "#d97706",
    info: "#0284c7",
  },

  /**
   * Include shared tokens
   */
  spacing: tokens.spacing,
  radius: tokens.radius,
  fontSize: tokens.fontSize,
  fontWeight: tokens.fontWeight,
  shadow: tokens.shadow,
  zIndex: tokens.zIndex,
  transition: tokens.transition,
};

export default brandTheme;
