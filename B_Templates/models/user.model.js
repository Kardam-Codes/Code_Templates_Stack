/**
 * FILE: user.model.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Contains pure SQL queries related to users.
 *
 * IMPORTANT:
 * - No business logic here.
 * - No database execution here.
 * - Only SQL strings.
 */

export const UserModel = {
  /**
   * Create new user
   */
  createUser: `
    INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, is_active, created_at, updated_at;
  `,

  /**
   * Find user by email (for login)
   */
  findByEmail: `
    SELECT id, name, email, password_hash, is_active
    FROM users
    WHERE email = $1;
  `,

  /**
   * Find user by ID
   */
  findById: `
    SELECT id, name, email, is_active, created_at, updated_at
    FROM users
    WHERE id = $1;
  `,

  /**
   * Get all users with pagination
   */
  getAllPaginated: `
    SELECT id, name, email, is_active, created_at, updated_at
    FROM users
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2;
  `,

  /**
   * Count total users (for pagination metadata)
   */
  countAll: `
    SELECT COUNT(*) FROM users;
  `,

  /**
   * Update user basic fields
   */
  updateUser: `
    UPDATE users
    SET name = $1,
        email = $2,
        is_active = $3
    WHERE id = $4
    RETURNING id, name, email, is_active, created_at, updated_at;
  `,

  /**
   * Soft deactivate user
   */
  deactivateUser: `
    UPDATE users
    SET is_active = FALSE
    WHERE id = $1
    RETURNING id;
  `,

  /**
   * Hard delete user
   */
  deleteUser: `
    DELETE FROM users
    WHERE id = $1;
  `,

  /**
   * Assign role to user (many-to-many)
   */
  assignRole: `
    INSERT INTO user_roles (user_id, role_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING;
  `,

  /**
   * Remove role from user
   */
  removeRole: `
    DELETE FROM user_roles
    WHERE user_id = $1 AND role_id = $2;
  `,

  /**
   * Get user roles
   */
  getUserRoles: `
    SELECT r.id, r.name
    FROM roles r
    INNER JOIN user_roles ur ON ur.role_id = r.id
    WHERE ur.user_id = $1;
  `,
}