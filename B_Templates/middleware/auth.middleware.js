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
import { ENV } from "../config/env.js"
import { query } from "../database/db.js"
import { UserModel } from "../models/user.model.js"
import { Response } from "../utils/response.js"

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.error(res, "Unauthorized: No token provided", 401)
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, ENV.JWT_SECRET)

    if (!decoded?.id) {
      return Response.error(res, "Unauthorized: Invalid token payload", 401)
    }

    const rolesResult = await query(UserModel.getUserRoles, [decoded.id])
    const roles = rolesResult.rows.map((role) => role.name)

    req.user = {
      ...decoded,
      roles,
    }

    next()
  } catch (error) {
    return Response.error(res, "Unauthorized: Invalid token", 401)
  }
}
