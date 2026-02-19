/**
 * FILE: user.routes.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * User management routes.
 */

import express from "express"
import { UserController } from "../controllers/user.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { roleMiddleware } from "../middleware/role.middleware.js"

const router = express.Router()

/**
 * All routes require authentication
 */
router.use(authMiddleware)

/**
 * GET /users
 * Admin only
 */
router.get("/", roleMiddleware(["admin"]), UserController.getAll)

/**
 * GET /users/:id
 * Admin or same user
 */
router.get("/:id", UserController.getById)

/**
 * UPDATE user
 * Admin only
 */
router.put("/:id", roleMiddleware(["admin"]), UserController.update)

/**
 * Deactivate user
 * Admin only
 */
router.patch(
  "/:id/deactivate",
  roleMiddleware(["admin"]),
  UserController.deactivate
)

/**
 * Delete user
 * Admin only
 */
router.delete("/:id", roleMiddleware(["admin"]), UserController.delete)

export default router