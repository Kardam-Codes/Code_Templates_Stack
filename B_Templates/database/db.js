/**
 * FILE: db.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Central PostgreSQL database layer.
 *
 * RESPONSIBILITIES:
 * - Create shared connection pool
 * - Provide query execution wrapper
 * - Provide transaction helper
 * - Handle graceful shutdown
 *
 * IMPORTANT RULES:
 * - No SQL business logic here
 * - No schema definitions here
 * - Only execution layer
 */

import pkg from "pg"
import { ENV } from "../config/env.js"

const { Pool } = pkg

/**
 * Create PostgreSQL connection pool.
 * Pool manages multiple connections efficiently.
 */
const pool = new Pool({
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  ssl: ENV.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  max: 10, // maximum number of connections in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

/**
 * Test database connection on startup.
 */
export async function connectDatabase() {
  try {
    const client = await pool.connect()
    await client.query("SELECT 1") // simple test query
    client.release()

    console.log("✅ PostgreSQL connected successfully.")
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", error.message)
    process.exit(1)
  }
}

/**
 * Generic query execution wrapper.
 *
 * @param {string} text - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise<QueryResult>}
 */
export async function query(text, params = []) {
  try {
    const result = await pool.query(text, params)
    return result
  } catch (error) {
    console.error("❌ Database Query Error:", error.message)
    throw error
  }
}

/**
 * Transaction helper.
 *
 * Ensures:
 * - BEGIN
 * - COMMIT on success
 * - ROLLBACK on failure
 *
 * @param {Function} callback - receives client
 */
export async function withTransaction(callback) {
  const client = await pool.connect()

  try {
    await client.query("BEGIN")

    const result = await callback(client)

    await client.query("COMMIT")
    return result
  } catch (error) {
    await client.query("ROLLBACK")
    console.error("❌ Transaction rolled back:", error.message)
    throw error
  } finally {
    client.release()
  }
}

/**
 * Graceful shutdown handler.
 * Ensures pool closes properly.
 */
export async function closeDatabase() {
  try {
    await pool.end()
    console.log("🔌 PostgreSQL pool closed.")
  } catch (error) {
    console.error("Error closing database pool:", error.message)
  }
}

/**
 * Optional: expose pool for advanced use (rarely needed)
 */
export { pool }
