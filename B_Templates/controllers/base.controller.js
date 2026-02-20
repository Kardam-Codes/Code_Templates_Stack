/**
 * FILE: base.controller.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Minimal controller helpers shared across controllers when needed.
 */

export class BaseController {
  static ok(res, data = null, message = "Success") {
    return res.status(200).json({
      success: true,
      message,
      data,
    })
  }

  static created(res, data = null, message = "Created") {
    return res.status(201).json({
      success: true,
      message,
      data,
    })
  }
}