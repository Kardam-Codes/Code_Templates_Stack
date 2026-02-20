/**
 * FILE: validate.middleware.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Reusable request validation middleware.
 */

import { Response } from "../utils/response.js"

/**
 * @param {(req: import("express").Request) => string | null} validator
 */
export function validateMiddleware(validator) {
  return (req, res, next) => {
    try {
      const errorMessage = validator(req)

      if (errorMessage) {
        return Response.error(res, errorMessage, 400)
      }

      return next()
    } catch (error) {
      return next(error)
    }
  }
}
