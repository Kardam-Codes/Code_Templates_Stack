/**
 * FILE: app.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Configure Express application.
 *
 * IMPORTANT:
 * - No server startup here
 * - Only middleware and routes
 */

import express from "express"
import cors from "cors"
import morgan from "morgan"

import { ENV } from "../config/env.js"

// Routes
import healthRoutes from "../routes/health.routes.js"
import authRoutes from "../routes/auth.routes.js"
import userRoutes from "../routes/user.routes.js"

// Middleware
import { errorMiddleware } from "../middleware/error.middleware.js"

const app = express()

/**
 * GLOBAL MIDDLEWARE
 */

// Enable CORS
app.use(cors())

// Parse JSON body
app.use(express.json())

// Log requests in development mode
if (ENV.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

/**
 * ROUTES
 */

// Health check
app.use("/api/health", healthRoutes)

// Auth routes
app.use("/api/auth", authRoutes)

// User routes
app.use("/api/users", userRoutes)

/**
 * GLOBAL ERROR HANDLER
 * Must be LAST middleware
 */
app.use(errorMiddleware)

export default app
