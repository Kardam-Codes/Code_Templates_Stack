/**
 * FILE.middleware.ts
 * OWNER
 *
 * PURPOSE:
 * - Reusable TEMPLATE for hackathons & fast builds
 *
 * YOU SHOULD:
 * - Implement the simplest working version
 * - Keep defaults predictable
 * - Make it reusable across projects
 *
 * DO NOT:
 * - Add business-specific logic
 * - Over-engineer
 * - Optimize prematurely
 *
 * NOTES:
 * - This file can be extended or deleted later
 * - Clarity > Cleverness
 */


/**
 * File: backend/templates/middleware/auth.middleware.js
 *
 * Purpose:
 * This middleware protects routes that require authentication.
 *
 * It verifies the JWT token sent by the client.
 *
 * Why this exists:
 * Ensures only logged-in users can access protected routes.
 *
 * Example protected routes:
 * - Dashboard
 * - Profile
 * - Admin panel
 *
 * Expected header:
 * Authorization: Bearer <token>
 *
 * Demo safety:
 * Prevents crashes and returns clean error messages.
 */

import jwt from "jsonwebtoken";

/**
 * Auth Middleware
 *
 * Usage example:
 * router.get("/profile", authMiddleware, controller);
 */
function authMiddleware(req, res, next) {
  try {
    /**
     * Get Authorization header
     */
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    /**
     * Expected format: Bearer TOKEN
     */
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const token = parts[1];

    /**
     * Verify token
     *
     * NOTE:
     * Replace "secret" with process.env.JWT_SECRET in real usage
     */
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    /**
     * Attach user data to request
     */
    req.user = decoded;

    /**
     * Continue to next middleware or route
     */
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

export default authMiddleware;
