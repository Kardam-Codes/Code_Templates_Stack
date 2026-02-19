/**
 * FILE: featureFlags.js
 * OWNER: Misha
 *
 * PURPOSE:
 * Control frontend feature visibility.
 *
 * WHY:
 * - Enable/disable features without deleting code
 * - Adjust UI quickly during hackathons
 *
 * NOTE:
 * Backend feature flags are separate.
 */

export const FEATURE_FLAGS = {
  ENABLE_AUTH: true,
  ENABLE_ADMIN_PANEL: true,
  ENABLE_ANALYTICS: false,
  ENABLE_REALTIME: false,
  ENABLE_THEME_SWITCH: true,
}
