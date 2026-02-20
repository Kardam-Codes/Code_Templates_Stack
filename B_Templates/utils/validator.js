/**
 * validator.js
 * Validation Utilities
 *
 * PURPOSE:
 * - Reusable validation helpers for authentication
 *
 * YOU SHOULD:
 * - Keep validation rules simple and predictable
 * - Reuse across projects
 *
 * DO NOT:
 * - Add complex business logic
 * - Over-engineer
 *
 * NOTES:
 * - Extend validators as needed
 * - Clarity over complexity
 */
*
  SIMPLE VALIDATION HELPERS
*/

exports.validateLoginInput = (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password required");
  }
};

exports.validateSignupInput = (name, email, password) => {
  if (!name || !email || !password) {
    throw new Error("All fields required");
  }
};