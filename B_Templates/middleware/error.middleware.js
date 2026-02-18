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
 * File: backend/templates/middleware/error.middleware.js
 *
 * Purpose:
 * This middleware handles all errors in one central place.
 *
 * Why this exists:
 * Prevents server crashes and ensures safe error responses.
 * Instead of exposing sensitive error details,
 * it returns a clean, demo-safe message to the client.
 *
 * This is critical for:
 * - Demo reliability
 * - Debugging
 * - Preventing server crashes
 *
 * How Express error middleware works:
 * It must have 4 parameters: (err, req, res, next)
 */

function errorMiddleware(err, req, res, next) {
  try {
    /**
     * Log error for developers (safe for demo)
     */
    console.error("Error:", err.message);

    /**
     * Determine safe status code
     */
    const statusCode = err.statusCode || 500;

    /**
     * Determine safe error message
     */
    const message =
      err.message || "Internal Server Error";

    /**
     * Send safe JSON response
     */
    res.status(statusCode).json({
      success: false,
      message: message,
    });

  } catch (middlewareError) {
    /**
     * Fallback protection if error handler itself fails
     */
    console.error("Error middleware failure:", middlewareError);

    res.status(500).json({
      success: false,
      message: "Critical server error",
    });
  }
}

export default errorMiddleware;
