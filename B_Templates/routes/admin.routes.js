/**
 * FILE: admin.routes.js
 * OWNER: Jay
 */

import express from "express"
import { AdminController } from "../controllers/admin.controller.js"

const router = express.Router()

router.post("/", AdminController.create)
router.get("/", AdminController.getAll)
router.delete("/:id", AdminController.delete)

export default router
