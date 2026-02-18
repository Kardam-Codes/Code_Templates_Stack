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
 * File: backend/templates/middleware/role.middleware.js
 *
 * Purpose:
 * This middleware restricts access based on user role.
 *
 * Why this exists:
 * Some routes should only be accessible to specific roles.
 *
 * Examples:
 * - Admin dashboard → admin only
 * - User profile → user and admin
 *
 * This middleware must be used AFTER auth.middleware,
 * because it depends on req.user.
 *
 * Example usage:
 * router.get("/admin", authMiddleware, roleMiddleware("admin"), controller);
 *
 * Demo safety:
 * Returns clean error messages and prevents crashes.
 */

/**
 * Role Middleware Factory Function
 *
 * @param {string} requiredRole - role required to access route
 */
function roleMiddleware(requiredRole) {
  return function (req, res, next) {
    try {
      /**
       * Ensure user exists (auth middleware should run first)
       */
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      /**
       * Check user role
       */
      const userRole = req.user.role;

      if (userRole !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: "Access denied: insufficient permissions",
        });
      }

      /**
       * User has correct role
       */
      next();

    } catch (error) {
      console.error("Role middleware error:", error);

      return res.status(500).json({
        success: false,
        message: "Server error during role check",
      });
    }
  };
}

export default roleMiddleware;
