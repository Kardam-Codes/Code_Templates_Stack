/**
 * FILE: routes.config.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * This file defines ALL application routes in one place.
 *
 * WHY THIS EXISTS:
 * - Prevent hardcoding paths across the app
 * - Separate public and private routes
 * - Support feature flags easily
 * - Make route management predictable
 *
 * IMPORTANT RULES:
 * - No UI logic here
 * - No React components imported here
 * - Only route metadata
 *
 * This file describes routes.
 * Another file (like App.jsx) will read this config
 * and render actual <Route /> components.
 */

import { APP_CONFIG } from "./app.config"

/**
 * PUBLIC ROUTES
 * Accessible without authentication
 */
const publicRoutes = [
  {
    path: "/login",
    name: "Login",
    layout: "auth", // which layout should wrap this page
  },
  {
    path: "/signup",
    name: "Signup",
    layout: "auth",
  },
]

/**
 * PRIVATE ROUTES
 * Require authentication
 */
const privateRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    layout: "dashboard",
  },
  {
    path: "/profile",
    name: "Profile",
    layout: "dashboard",
  },
]

/**
 * ADMIN ROUTES
 * Only enabled if feature flag is true
 */
const adminRoutes = APP_CONFIG.features.admin
  ? [
      {
        path: "/admin",
        name: "Admin",
        layout: "dashboard",
        role: "admin", // optional role metadata
      },
    ]
  : []

/**
 * FALLBACK ROUTE
 * Used for 404 pages
 */
const fallbackRoute = {
  path: "*",
  name: "NotFound",
  layout: "public",
}

/**
 * Export combined route list
 *
 * This creates one flat array of all routes.
 */
export const ROUTES = [
  ...publicRoutes,
  ...privateRoutes,
  ...adminRoutes,
  fallbackRoute,
]
