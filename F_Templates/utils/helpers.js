/**
 * FILE: helpers.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Store reusable helper functions.
 *
 * RULES:
 * - No React here
 * - No UI here
 * - Only pure JS utilities
 */

/**
 * Safely format date
 */
export function formatDate(date) {
  if (!date) return ""

  return new Date(date).toLocaleDateString()
}

/**
 * Capitalize first letter of string
 */
export function capitalize(text) {
  if (!text) return ""

  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Generate random ID (for demo mode)
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9)
}
