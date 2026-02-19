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

const router = express.Router()

// Register new user
router.post("/register", AuthController.register)

// Login user
router.post("/login", AuthController.login)

export default router