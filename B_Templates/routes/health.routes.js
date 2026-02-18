/**
 * FILE.routes.ts
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
 * File: backend/templates/routes/health.routes.js
 *
 * Purpose:
 * This route checks if the server is running properly.
 *
 * Why this exists:
 * During hackathons and demos, you need a quick way to verify
 * that the backend server is alive and responding.
 *
 * This is useful for:
 * - Demo safety
 * - Deployment checks
 * - Monitoring server health
 *
 * Example request:
 * GET /health
 *
 * Example response:
 * {
 *   success: true,
 *   message: "Server is healthy",
 *   timestamp: "2026-02-18T18:00:00.000Z"
 * }
 */

import express from "express";

const router = express.Router();

/**
 * Health check route
 */
router.get("/", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Server is healthy",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Health check failed",
    });
  }
});

export default router;
