/**
 * FILE: logger.middleware.js
 * OWNER: Misha
 *
 * PURPOSE:
 * Log incoming requests.
 *
 * WHY:
 * - Debug during hackathon
 * - Understand traffic flow
 */

export function loggerMiddleware(req, res, next) {
  const start = Date.now()

  res.on("finish", () => {
    const duration = Date.now() - start
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    )
  })

  next()
}
