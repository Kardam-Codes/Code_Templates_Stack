/**
 * FILE: featureFlags.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Centralized backend feature flags.
 *
 * WHY THIS EXISTS:
 * - Enable/disable features without deleting code
 * - Keep flags separate from main config
 * - Make backend behavior flexible during hackathons
 *
 * RULES:
 * - No logic here
 * - Only boolean flags
 */

export const FEATURE_FLAGS = {
  AUTH_ENABLED: true,
  ADMIN_ENABLED: false,
  LOGGING_ENABLED: true,
  SEED_ON_START: false,
}
