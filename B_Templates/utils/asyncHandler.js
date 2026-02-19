/**
 * FILE: asyncHandler.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Wrap async route handlers to avoid try/catch repetition.
 *
 * WHY THIS EXISTS:
 * - Prevent repetitive try/catch blocks
 * - Automatically pass errors to Express error middleware
 *
 * USAGE:
 * router.get("/", asyncHandler(controllerFunction))
 */

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
