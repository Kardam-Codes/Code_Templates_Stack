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
 * File: backend/templates/middleware/logger.middleware.js
 *
 * Purpose:
 * This middleware logs all incoming HTTP requests.
 *
 * Why this exists:
 * Helps developers see what requests are happening.
 * Useful for debugging during hackathons and demos.
 *
 * This logger is:
 * - Simple
 * - Beginner-friendly
 * - No external libraries
 * - Safe for demo usage
 *
 * It logs:
 * - HTTP method (GET, POST, etc.)
 * - Request URL
 * - Time of request
 */

function loggerMiddleware(req, res, next) {
  try {
    const timestamp = new Date().toISOString();

    const method = req.method;
    const url = req.originalUrl;

    console.log(`[${timestamp}] ${method} ${url}`);

  } catch (error) {
    // Prevent logger from crashing the app
    console.error("Logger middleware error:", error);
  }

  // Continue to next middleware or route
  next();
}

export default loggerMiddleware;
