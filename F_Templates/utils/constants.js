/**
 * FILE: constants.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Store reusable constant values.
 *
 * WHY THIS EXISTS:
 * - Prevent hardcoding strings everywhere
 * - Keep reusable values centralized
 */

export const API_BASE_URL = "http://localhost:5000/api"

export const ROUTE_PATHS = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  ADMIN: "/admin",
}

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
}
