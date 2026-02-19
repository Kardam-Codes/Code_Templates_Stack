/**
 * FILE: brand.js
 * OWNER: Misha
 *
 * PURPOSE:
 * Brand theme for hackathon presentations.
 */

import { TOKENS } from "./tokens"

export const brandTheme = {
  name: "brand",

  colors: {
    background: "#fdf2f8",
    surface: "#ffffff",
    primary: "#db2777",
    secondary: "#9333ea",
    success: "#10b981",
    danger: "#f43f5e",
    textPrimary: "#1f2937",
    textSecondary: "#6b7280",
    border: "#fbcfe8",
  },

  ...TOKENS,
}
