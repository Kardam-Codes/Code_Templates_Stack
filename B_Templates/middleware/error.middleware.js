/**
 * FILE: error.middleware.js
 * OWNER: Misha
 *
 * PURPOSE:
 * Global error handler.
 *
 * WHY:
 * - Prevent server crash
 * - Standardize error output
 */

export function errorMiddleware(err, req, res, next) {
  console.error("🔥 Global Error:", err)

  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    message,
  })
}
