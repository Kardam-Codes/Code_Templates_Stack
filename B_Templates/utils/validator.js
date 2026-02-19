/**
 * FILE: validator.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Strong input validation utilities.
 *
 * IMPORTANT:
 * - No external dependencies
 * - Prevent invalid data reaching database
 * - Throw structured errors
 */

export class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 400
  }
}

/**
 * Required field validation
 */
export function requireFields(data, fields = []) {
  for (const field of fields) {
    if (!data[field]) {
      throw new ValidationError(`${field} is required`)
    }
  }
}

/**
 * Email format validation
 */
export function validateEmail(email) {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    throw new ValidationError("Invalid email format")
  }
}

/**
 * Password strength validation
 * Minimum:
 * - 8 characters
 * - 1 uppercase
 * - 1 lowercase
 * - 1 number
 */
export function validatePassword(password) {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

  if (!strongPasswordRegex.test(password)) {
    throw new ValidationError(
      "Password must be at least 8 characters and include uppercase, lowercase and number"
    )
  }
}

/**
 * UUID validation
 */
export function validateUUID(id) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

  if (!uuidRegex.test(id)) {
    throw new ValidationError("Invalid UUID format")
  }
}

/**
 * String length validation
 */
export function validateLength(value, min, max, fieldName = "Field") {
  if (value.length < min || value.length > max) {
    throw new ValidationError(
      `${fieldName} must be between ${min} and ${max} characters`
    )
  }
}

/**
 * Basic string sanitization
 */
export function sanitizeString(value) {
  if (typeof value !== "string") return value
  return value.trim()
}