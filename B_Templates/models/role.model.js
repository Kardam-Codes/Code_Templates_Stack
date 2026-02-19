/**
 * FILE: role.model.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Contains pure SQL queries related to roles.
 *
 * IMPORTANT:
 * - No execution logic here.
 * - No business rules here.
 * - Only SQL strings.
 */

export const RoleModel = {
  /**
   * Create new role
   */
  createRole: `
    INSERT INTO roles (name)
    VALUES ($1)
    RETURNING id, name, created_at, updated_at;
  `,

  /**
   * Find role by name
   */
  findByName: `
    SELECT id, name, created_at, updated_at
    FROM roles
    WHERE name = $1;
  `,

  /**
   * Find role by ID
   */
  findById: `
    SELECT id, name, created_at, updated_at
    FROM roles
    WHERE id = $1;
  `,

  /**
   * Get all roles
   */
  getAll: `
    SELECT id, name, created_at, updated_at
    FROM roles
    ORDER BY created_at ASC;
  `,

  /**
   * Update role name
   */
  updateRole: `
    UPDATE roles
    SET name = $1
    WHERE id = $2
    RETURNING id, name, created_at, updated_at;
  `,

  /**
   * Delete role
   * NOTE:
   * user_roles has ON DELETE CASCADE,
   * so related mappings will be removed automatically.
   */
  deleteRole: `
    DELETE FROM roles
    WHERE id = $1;
  `,

  /**
   * Get users assigned to a role
   */
  getUsersByRole: `
    SELECT u.id, u.name, u.email, u.is_active, u.created_at
    FROM users u
    INNER JOIN user_roles ur ON ur.user_id = u.id
    WHERE ur.role_id = $1
    ORDER BY u.created_at DESC;
  `,
}