/**
 * FILE: health.routes.js
 * OWNER: Misha
 *
 * PURPOSE:
 * Provide system health status.
 *
 * WHY:
 * - Check if backend is alive
 * - Use for deployment verification
 * - Professional touch in hackathons
 */

import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})

export default router
