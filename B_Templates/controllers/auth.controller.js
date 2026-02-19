/**
 * FILE: auth.controller.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * HTTP layer for authentication.
 *
 * RESPONSIBILITIES:
 * - Validate required fields
 * - Call AuthService
 * - Return proper HTTP responses
 * - Handle errors cleanly
 */

import { AuthService } from "../services/auth.service.js"

export const AuthController = {
  /**
   * POST /auth/register
   */
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body

      // Basic required field validation
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Name, email and password are required",
        })
      }

      const result = await AuthService.register({
        name,
        email,
        password,
      })

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      })
    } catch (error) {
      next(error)
    }
  },

  /**
   * POST /auth/login
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        })
      }

      const result = await AuthService.login({
        email,
        password,
      })

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      })
    } catch (error) {
      next(error)
    }
  },
}