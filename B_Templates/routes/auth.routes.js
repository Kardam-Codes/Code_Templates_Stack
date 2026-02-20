/**
 * FILE: auth.routes.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Defines authentication routes.
 *
 * ROUTES:
 * - POST /auth/register
 * - POST /auth/login
 */

import express from "express"
import { AuthController } from "../controllers/auth.controller.js"
import { validateMiddleware } from "../middleware/validate.middleware.js"

const router = express.Router()

const validateRegister = (req) => {
  const { name, email, password } = req.body || {}

  if (!name || !email || !password) {
    return "Name, email and password are required"
  }

  return null
}

const validateLogin = (req) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return "Email and password are required"
  }

  return null
}

// Register new user
router.post("/register", validateMiddleware(validateRegister), AuthController.register)

// Login user
router.post("/login", validateMiddleware(validateLogin), AuthController.login)

export default router
