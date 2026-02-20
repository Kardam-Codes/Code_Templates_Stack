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
import { query } from "../database/db.js"

const router = express.Router()

router.get("/", async (req, res) => {
  let database = "up"

  try {
    await query("SELECT 1")
  } catch (error) {
    database = "down"
  }

  const isHealthy = database === "up"

  res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    status: isHealthy ? "OK" : "DEGRADED",
    database,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})

export default router
