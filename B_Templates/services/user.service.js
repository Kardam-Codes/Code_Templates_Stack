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
import bcrypt from "bcrypt"

import {
  validateUUID,
  sanitizeString,
  validateEmail,
  validateLength,
} from "../utils/validator.js"

const SALT_ROUNDS = 10

export const UserService = {
  async createUser(data) {
    const name = sanitizeString(data.name)
    const email = sanitizeString(data.email)

    if (!name || !email) {
      const error = new Error("name and email are required")
      error.statusCode = 400
      throw error
    }

    validateLength(name, 2, 150, "Name")
    validateEmail(email)

    const password = data.password || "TempPass123!"
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

    return await withTransaction(async (client) => {
      const createdUserResult = await client.query(UserModel.createUser, [
        name,
        email,
        passwordHash,
      ])

      const createdUser = createdUserResult.rows[0]

      await client.query(AuditModel.createLog, [
        createdUser.id,
        "USER_CREATED",
        JSON.stringify({ email }),
      ])

      return createdUser
    })
  },

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

  async getAll({ page = 1, limit = 10, name, email }) {
    const parsedPage = Number.parseInt(page, 10)
    const parsedLimit = Number.parseInt(limit, 10)

    page = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage
    limit = Number.isNaN(parsedLimit) || parsedLimit < 1 ? 10 : parsedLimit
    limit = Math.min(limit, 100)

    const offset = (page - 1) * limit

    const whereParts = []
    const whereParams = []

    const sanitizedName = sanitizeString(name)
    if (sanitizedName) {
      whereParams.push(`%${sanitizedName}%`)
      whereParts.push(`name ILIKE $${whereParams.length}`)
    }

    const sanitizedEmail = sanitizeString(email)
    if (sanitizedEmail) {
      whereParams.push(`%${sanitizedEmail}%`)
      whereParts.push(`email ILIKE $${whereParams.length}`)
    }

    let usersResult
    let countResult

    if (whereParts.length === 0) {
      usersResult = await query(UserModel.getAllPaginated, [limit, offset])
      countResult = await query(UserModel.countAll)
    } else {
      const whereClause = `WHERE ${whereParts.join(" AND ")}`

      usersResult = await query(
        `
          SELECT id, name, email, is_active, created_at, updated_at
          FROM users
          ${whereClause}
          ORDER BY created_at DESC
          LIMIT $${whereParams.length + 1} OFFSET $${whereParams.length + 2};
        `,
        [...whereParams, limit, offset]
      )

      countResult = await query(
        `
          SELECT COUNT(*)
          FROM users
          ${whereClause};
        `,
        whereParams
      )
    }

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
