/**
 * FILE: app.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Create and configure Express application.
 *
 * WHY THIS EXISTS:
 * - Separate app setup from server start
 * - Easier testing
 * - Cleaner structure
 *
 * IMPORTANT:
 * - Do NOT start server here
 * - Only configure app
 */

import express from "express"
import cors from "cors"
import morgan from "morgan"

import { APP_CONFIG } from "../config/app.config.js"

// Future route imports (others will build these)
import healthRoutes from "../routes/health.routes.js"

const app = express()

/**
 * GLOBAL MIDDLEWARE
 */

// Enable CORS
app.use(cors())

// Parse JSON body
app.use(express.json())

// Log requests in development mode
if (APP_CONFIG.debug.logRequests) {
  app.use(morgan("dev"))
}

/**
 * ROUTES
 */

// Health check route
app.use("/api/health", healthRoutes)

/**
 * GLOBAL ERROR HANDLER
 * (Misha will build error.middleware.js later)
 */
// app.use(errorMiddleware) ← will plug later

export default app
