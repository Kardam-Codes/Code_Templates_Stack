/**
 * FILE: error.middleware.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Global error handler with PostgreSQL awareness.
 *
 * FEATURES:
 * - Handles custom errors
 * - Handles PostgreSQL errors
 * - Prevents internal error leaks
 * - Returns proper HTTP status codes
 */

export function errorMiddleware(err, req, res, next) {
  console.error("🔥 Error:", err)

  /**
   * Custom application error support
   */
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  /**
   * PostgreSQL Error Handling
   * Reference: https://www.postgresql.org/docs/current/errcodes-appendix.html
   */

  // Unique constraint violation
  if (err.code === "23505") {
    return res.status(409).json({
      success: false,
      message: "Duplicate value violates unique constraint",
    })
  }

  // Foreign key violation
  if (err.code === "23503") {
    return res.status(400).json({
      success: false,
      message: "Invalid reference to related record",
    })
  }

  // Not-null violation
  if (err.code === "23502") {
    return res.status(400).json({
      success: false,
      message: "Missing required field",
    })
  }

  // Invalid text representation (e.g., bad UUID)
  if (err.code === "22P02") {
    return res.status(400).json({
      success: false,
      message: "Invalid input format",
    })
  }

  /**
   * Default fallback
   */
  return res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  })
}