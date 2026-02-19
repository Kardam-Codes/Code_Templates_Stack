/**
 * FILE: role.middleware.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Restrict access by role.
 */

import { Response } from "../utils/response.js"

export function roleMiddleware(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return Response.error(res, "Unauthorized: User context missing", 401)
    }

    if (!Array.isArray(allowedRoles) || allowedRoles.length === 0) {
      return next()
    }

    const userRoles = Array.isArray(req.user.roles) ? req.user.roles : []
    const hasRequiredRole = allowedRoles.some((role) => userRoles.includes(role))

    if (!hasRequiredRole) {
      return Response.error(res, "Forbidden: Insufficient role", 403)
    }

    return next()
  }
}
