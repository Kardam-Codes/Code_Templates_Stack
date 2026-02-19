/**
 * FILE: role.middleware.js
 * OWNER: Misha
 *
 * PURPOSE:
 * Restrict access based on user role.
 *
 * USAGE:
 * router.get("/admin", authMiddleware, roleMiddleware("admin"), controller)
 */

import { Response } from "../utils/response.js"

export function roleMiddleware(requiredRole) {
  return function (req, res, next) {
    if (!req.user) {
      return Response.error(res, "Unauthorized", 401)
    }

    if (req.user.role !== requiredRole) {
      return Response.error(res, "Forbidden: Insufficient role", 403)
    }

    next()
  }
}
