/**
 * FILE: dark.js
 * OWNER: Misha
 *
 * PURPOSE:
 * Dark theme configuration.
 */

import { TOKENS } from "./tokens"

export const darkTheme = {
  name: "dark",

  colors: {
    background: "#0f172a",
    surface: "#1e293b",
    primary: "#3b82f6",
    secondary: "#94a3b8",
    success: "#22c55e",
    danger: "#ef4444",
    textPrimary: "#f8fafc",
    textSecondary: "#cbd5e1",
    border: "#334155",
  },

  ...TOKENS,
}
