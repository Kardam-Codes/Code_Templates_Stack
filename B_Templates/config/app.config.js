/**
 * FILE: app.config.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Backend application configuration.
 *
 * WHY THIS EXISTS:
 * - Central place for backend behavior settings
 * - Enable/disable features
 * - Control debug modes
 *
 * RULE:
 * - No business logic here
 * - Only configuration values
 */

import { ENV } from "./env.js"

export const APP_CONFIG = {
  env: ENV.NODE_ENV,
  port: ENV.PORT,

  features: {
    auth: true,
    admin: false,
    logging: true,
  },

  security: {
    jwtSecret: ENV.JWT_SECRET,
  },

  debug: {
    logRequests: ENV.NODE_ENV === "development",
  },
}
