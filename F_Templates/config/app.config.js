/**
 * FILE: app.config.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Central configuration file for frontend behavior.
 *
 * WHY THIS EXISTS:
 * - Change app behavior without editing components
 * - Control demo vs live mode
 * - Enable/disable features
 * - Control theme selection
 *
 * IMPORTANT RULES:
 * - No functions here
 * - No business logic here
 * - Only configuration values
 */

export const APP_CONFIG = {
  /**
   * Basic App Info
   */
  appName: "Hackathon Framework",
  version: "1.0.0",

  /**
   * Mode:
   * - "demo" → mock data
   * - "live" → real backend
   */
  mode: "live",

  /**
   * Feature Flags
   * Toggle features without deleting code
   */
  features: {
    auth: true,
    admin: false,
    analytics: false,
    realtime: false,
  },

  /**
   * Default theme
   * Misha's theme system will use this
   */
  theme: "light", // "light" | "dark" | "brand"

  /**
   * Debug settings
   */
  debug: {
    logApiCalls: true,
  },
}
