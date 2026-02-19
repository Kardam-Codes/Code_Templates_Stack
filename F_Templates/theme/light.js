/**
 * FILE: light.js
 * OWNER: Misha
 *
 * PURPOSE:
 * Light theme configuration.
 */

import { TOKENS } from "./tokens"

export const lightTheme = {
  name: "light",

  colors: {
    background: "#f4f6f8",
    surface: "#ffffff",
    primary: "#2563eb",
    secondary: "#64748b",
    success: "#16a34a",
    danger: "#dc2626",
    textPrimary: "#111827",
    textSecondary: "#6b7280",
    border: "#e5e7eb",
  },

  ...TOKENS,
}
