/**
 * FILE: auth.service.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Authentication business logic with strong validation.
 */

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { query, withTransaction } from "../database/db.js"
import { ENV } from "../config/env.js"

import { UserModel } from "../models/user.model.js"
import { RoleModel } from "../models/role.model.js"
import { AuditModel } from "../models/audit.model.js"

import {
  requireFields,
  validateEmail,
  validatePassword,
  sanitizeString,
} from "../utils/validator.js"

const SALT_ROUNDS = 10

export const AuthService = {
  async register(data) {
    requireFields(data, ["name", "email", "password"])

    const name = sanitizeString(data.name)
    const email = sanitizeString(data.email)
    const password = data.password

    validateEmail(email)
    validatePassword(password)

    const existing = await query(UserModel.findByEmail, [email])
    if (existing.rows.length > 0) {
      const error = new Error("Email already registered")
      error.statusCode = 409
      throw error
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

    return await withTransaction(async (client) => {
      const userResult = await client.query(UserModel.createUser, [
        name,
        email,
        passwordHash,
      ])

      const user = userResult.rows[0]

      const roleResult = await client.query(RoleModel.findByName, ["user"])
      const role = roleResult.rows[0]

      if (!role) {
        throw new Error("Default role not found")
      }

      await client.query(UserModel.assignRole, [user.id, role.id])

      await client.query(AuditModel.createLog, [
        user.id,
        "USER_REGISTERED",
        JSON.stringify({ email }),
      ])

      const token = jwt.sign(
        { id: user.id, email: user.email },
        ENV.JWT_SECRET,
        { expiresIn: "1h" }
      )

      return {
        user,
        token,
      }
    })
  },

  async login(data) {
    requireFields(data, ["email", "password"])

    const email = sanitizeString(data.email)
    const password = data.password

    validateEmail(email)

    const result = await query(UserModel.findByEmail, [email])

    if (result.rows.length === 0) {
      const error = new Error("Invalid credentials")
      error.statusCode = 401
      throw error
    }

    const user = result.rows[0]

    if (!user.is_active) {
      const error = new Error("Account is deactivated")
      error.statusCode = 403
      throw error
    }

    const isMatch = await bcrypt.compare(password, user.password_hash)

    if (!isMatch) {
      const error = new Error("Invalid credentials")
      error.statusCode = 401
      throw error
    }

    const rolesResult = await query(UserModel.getUserRoles, [user.id])
    const roles = rolesResult.rows.map((r) => r.name)

    const token = jwt.sign(
      { id: user.id, email: user.email, roles },
      ENV.JWT_SECRET,
      { expiresIn: "1h" }
    )

    await query(AuditModel.createLog, [
      user.id,
      "USER_LOGGED_IN",
      JSON.stringify({ email }),
    ])

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_active: user.is_active,
      },
      roles,
      token,
    }
  },
}