/**
 * FILE: user.service.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Business logic for user management.
 */

import { query, withTransaction } from "../database/db.js"
import { UserModel } from "../models/user.model.js"
import { AuditModel } from "../models/audit.model.js"

import {
  validateUUID,
  sanitizeString,
  validateEmail,
  validateLength,
} from "../utils/validator.js"

export const UserService = {
  async getById(id) {
    validateUUID(id)

    const result = await query(UserModel.findById, [id])

    if (result.rows.length === 0) {
      const error = new Error("User not found")
      error.statusCode = 404
      throw error
    }

    return result.rows[0]
  },

  async getAll({ page = 1, limit = 10 }) {
    page = Number(page)
    limit = Number(limit)

    const offset = (page - 1) * limit

    const usersResult = await query(UserModel.getAllPaginated, [
      limit,
      offset,
    ])

    const countResult = await query(UserModel.countAll)

    const total = Number(countResult.rows[0].count)

    return {
      data: usersResult.rows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  },

  async updateUser(id, data) {
    validateUUID(id)

    const name = sanitizeString(data.name)
    const email = sanitizeString(data.email)
    const isActive = data.is_active

    validateLength(name, 2, 150, "Name")
    validateEmail(email)

    const result = await query(UserModel.updateUser, [
      name,
      email,
      isActive,
      id,
    ])

    if (result.rows.length === 0) {
      const error = new Error("User not found")
      error.statusCode = 404
      throw error
    }

    await query(AuditModel.createLog, [
      id,
      "USER_UPDATED",
      JSON.stringify({ email }),
    ])

    return result.rows[0]
  },

  async deactivateUser(id) {
    validateUUID(id)

    const result = await query(UserModel.deactivateUser, [id])

    if (result.rows.length === 0) {
      const error = new Error("User not found")
      error.statusCode = 404
      throw error
    }

    await query(AuditModel.createLog, [
      id,
      "USER_DEACTIVATED",
      null,
    ])

    return { message: "User deactivated successfully" }
  },

  async deleteUser(id) {
    validateUUID(id)

    return await withTransaction(async (client) => {
      const result = await client.query(UserModel.deleteUser, [id])

      if (result.rowCount === 0) {
        const error = new Error("User not found")
        error.statusCode = 404
        throw error
      }

      await client.query(AuditModel.createLog, [
        id,
        "USER_DELETED",
        null,
      ])

      return { message: "User deleted successfully" }
    })
  },
}