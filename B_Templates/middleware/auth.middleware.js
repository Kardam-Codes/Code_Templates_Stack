/**
 * FILE: auth.middleware.js
 * OWNER: Misha
 *
 * PURPOSE:
 * Protect routes that require authentication.
 *
 * FEATURES:
 * - Validates JWT token
 * - Attaches user to request
 * - Prevents unauthorized access
 */

import jwt from "jsonwebtoken"
import { APP_CONFIG } from "../config/app.config.js"
import { Response } from "../utils/response.js"

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.error(res, "Unauthorized: No token provided", 401)
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, APP_CONFIG.security.jwtSecret)

    req.user = decoded

    next()
  } catch (error) {
    return Response.error(res, "Unauthorized: Invalid token", 401)
  }
}
