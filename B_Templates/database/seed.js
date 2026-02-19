/**
 * FILE: seed.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Seed PostgreSQL demo data safely and idempotently.
 */

import bcrypt from "bcrypt"
import { fileURLToPath } from "url"
import { query, closeDatabase } from "./db.js"

const SALT_ROUNDS = 10

async function ensureRole(name) {
  await query(
    `
      INSERT INTO roles (name)
      VALUES ($1)
      ON CONFLICT (name) DO NOTHING;
    `,
    [name]
  )

  const result = await query(`SELECT id FROM roles WHERE name = $1;`, [name])
  return result.rows[0].id
}

async function ensureUser({ name, email, passwordHash }) {
  const existing = await query(
    `
      SELECT id, name, email, is_active, created_at, updated_at
      FROM users
      WHERE email = $1;
    `,
    [email]
  )

  if (existing.rows.length > 0) {
    return { user: existing.rows[0], created: false }
  }

  const created = await query(
    `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, is_active, created_at, updated_at;
    `,
    [name, email, passwordHash]
  )

  return { user: created.rows[0], created: true }
}

async function ensureUserRole(userId, roleId) {
  await query(
    `
      INSERT INTO user_roles (user_id, role_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, role_id) DO NOTHING;
    `,
    [userId, roleId]
  )
}

async function createAuditLog(userId, action, metadata) {
  await query(
    `
      INSERT INTO audit_logs (user_id, action, metadata)
      VALUES ($1, $2, $3);
    `,
    [userId, action, JSON.stringify(metadata)]
  )
}

export async function seedDatabase() {
  const userRoleId = await ensureRole("user")
  const adminRoleId = await ensureRole("admin")

  const demoPasswordHash = await bcrypt.hash("Password123", SALT_ROUNDS)

  const adminResult = await ensureUser({
    name: "Admin User",
    email: "admin@example.com",
    passwordHash: demoPasswordHash,
  })
  await ensureUserRole(adminResult.user.id, adminRoleId)

  const userResult = await ensureUser({
    name: "Demo User",
    email: "user@example.com",
    passwordHash: demoPasswordHash,
  })
  await ensureUserRole(userResult.user.id, userRoleId)

  if (adminResult.created) {
    await createAuditLog(adminResult.user.id, "SEED_ADMIN_CREATED", {
      email: adminResult.user.email,
    })
  }

  if (userResult.created) {
    await createAuditLog(userResult.user.id, "SEED_USER_CREATED", {
      email: userResult.user.email,
    })
  }

  console.log("Seed complete. Roles and demo users are ready.")
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedDatabase()
    .then(async () => {
      await closeDatabase()
      process.exit(0)
    })
    .catch(async (error) => {
      console.error("Seed failed:", error.message)
      await closeDatabase()
      process.exit(1)
    })
}