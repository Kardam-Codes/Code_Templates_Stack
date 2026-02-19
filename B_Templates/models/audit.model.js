/**
 * FILE: audit.model.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Contains pure SQL queries related to audit logs.
 *
 * IMPORTANT:
 * - No execution here.
 * - No business logic here.
 * - Only SQL strings.
 */

export const AuditModel = {
  /**
   * Create audit log entry
   */
  createLog: `
    INSERT INTO audit_logs (user_id, action, metadata)
    VALUES ($1, $2, $3)
    RETURNING id, user_id, action, metadata, created_at;
  `,

  /**
   * Get audit logs with pagination
   */
  getAllPaginated: `
    SELECT id, user_id, action, metadata, created_at
    FROM audit_logs
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2;
  `,

  /**
   * Count total audit logs
   */
  countAll: `
    SELECT COUNT(*) FROM audit_logs;
  `,

  /**
   * Get logs by user
   */
  getByUserId: `
    SELECT id, action, metadata, created_at
    FROM audit_logs
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `,

  /**
   * Delete old logs (maintenance use)
   */
  deleteOlderThan: `
    DELETE FROM audit_logs
    WHERE created_at < $1;
  `,
}