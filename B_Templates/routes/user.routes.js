/**
 * FILE: user.routes.js
 * OWNER: Jay
 *
 * PURPOSE:
 * Define user API endpoints.
 */

import express from "express"
import { UserController } from "../controllers/user.controller.js"

const router = express.Router()

router.post("/", UserController.create)
router.get("/", UserController.getAll)
router.get("/:id", UserController.getById)
router.put("/:id", UserController.update)
router.delete("/:id", UserController.delete)

export default router
