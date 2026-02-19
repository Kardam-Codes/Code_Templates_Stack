/**
 * FILE: user.controller.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * HTTP layer for user management.
 */

import { UserService } from "../services/user.service.js"

export const UserController = {
  /**
   * POST /users
   */
  async create(req, res, next) {
    try {
      const createdUser = await UserService.createUser(req.body)

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: createdUser,
      })
    } catch (error) {
      next(error)
    }
  },

  /**
   * GET /users
   */
  async getAll(req, res, next) {
    try {
      const { page, limit } = req.query

      const result = await UserService.getAll({ page, limit })

      return res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      })
    } catch (error) {
      next(error)
    }
  },

  /**
   * GET /users/:id
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params

      const user = await UserService.getById(id)

      return res.status(200).json({
        success: true,
        data: user,
      })
    } catch (error) {
      next(error)
    }
  },

  /**
   * PUT /users/:id
   */
  async update(req, res, next) {
    try {
      const { id } = req.params

      const updatedUser = await UserService.updateUser(id, req.body)

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      })
    } catch (error) {
      next(error)
    }
  },

  /**
   * PATCH /users/:id/deactivate
   */
  async deactivate(req, res, next) {
    try {
      const { id } = req.params

      const result = await UserService.deactivateUser(id)

      return res.status(200).json({
        success: true,
        message: result.message,
      })
    } catch (error) {
      next(error)
    }
  },

  /**
   * DELETE /users/:id
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params

      const result = await UserService.deleteUser(id)

      return res.status(200).json({
        success: true,
        message: result.message,
      })
    } catch (error) {
      next(error)
    }
  },
}
