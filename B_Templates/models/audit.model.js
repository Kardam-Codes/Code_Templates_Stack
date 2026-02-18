/**
 * FILE.model.ts
 * OWNER
 *
 * PURPOSE:
 * - Reusable TEMPLATE for hackathons & fast builds
 *
 * YOU SHOULD:
 * - Implement the simplest working version
 * - Keep defaults predictable
 * - Make it reusable across projects
 *
 * DO NOT:
 * - Add business-specific logic
 * - Over-engineer
 * - Optimize prematurely
 *
 * NOTES:
 * - This file can be extended or deleted later
 * - Clarity > Cleverness
 */


/**
 * File: backend/templates/models/audit.model.js
 *
 * Purpose:
 * This model stores audit logs for important system events.
 *
 * Why this exists:
 * Helps track what happens inside the system.
 * Useful for debugging, monitoring, and demo reliability.
 *
 * Example events:
 * - User login
 * - User signup
 * - Data created / deleted
 * - Admin actions
 *
 * This is NOT required for basic functionality,
 * but is very useful for reliability and debugging.
 *
 * Safe for hackathon templates.
 */

import mongoose from "mongoose";

/**
 * Audit Log Schema
 */
const auditSchema = new mongoose.Schema({
  /**
   * Type of event
   * Examples:
   * "LOGIN"
   * "SIGNUP"
   * "CREATE"
   * "DELETE"
   */
  action: {
    type: String,
    required: true,
  },

  /**
   * User ID (optional)
   * Useful to know who performed the action
   */
  userId: {
    type: String,
    default: null,
  },

  /**
   * Additional details (optional)
   * Example: which resource was affected
   */
  details: {
    type: String,
    default: "",
  },

  /**
   * Timestamp of event
   */
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Create model
 */
const AuditLog = mongoose.model("AuditLog", auditSchema);

export default AuditLog;
