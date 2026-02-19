/**
 * FILE: admin.controller.js
 * OWNER: Jay
 */

import { AdminService } from "../services/admin.service.js"
import { Response } from "../utils/response.js"

export const AdminController = {
  create(req, res) {
    const admin = AdminService.create(req.body)
    return Response.success(res, admin, "Admin created", 201)
  },

  getAll(req, res) {
    const admins = AdminService.getAll()
    return Response.success(res, admins)
  },

  delete(req, res) {
    const success = AdminService.delete(req.params.id)
    if (!success) return Response.error(res, "Admin not found", 404)
    return Response.success(res, null, "Admin deleted")
  },
}
