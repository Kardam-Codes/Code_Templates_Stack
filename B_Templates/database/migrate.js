/**
 * FILE: migrate.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Hybrid migration runner.
 *
 * FEATURES:
 * - Reads SQL files from migrations folder
 * - Executes in sorted order
 * - Tracks executed migrations in DB
 * - Prevents duplicate runs
 * - Runs inside transaction
 *
 * USAGE:
 * node migrate.js
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { query, withTransaction } from "./db.js"

// Needed because ES modules do not have __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MIGRATIONS_DIR = path.join(__dirname, "migrations")

/**
 * Ensure migration tracking table exists.
 */
async function ensureMigrationTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) NOT NULL UNIQUE,
      executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `)
}

/**
 * Get already executed migrations.
 */
async function getExecutedMigrations() {
  const result = await query(`SELECT filename FROM migrations`)
  return result.rows.map((row) => row.filename)
}

/**
 * Read migration files from directory.
 */
function getMigrationFiles() {
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith(".sql"))
    .sort()
}

/**
 * Execute a single migration file inside transaction.
 */
async function runMigration(filename) {
  const filePath = path.join(MIGRATIONS_DIR, filename)
  const sql = fs.readFileSync(filePath, "utf8")

  console.log(`🚀 Running migration: ${filename}`)

  await withTransaction(async (client) => {
    await client.query(sql)

    await client.query(
      `INSERT INTO migrations (filename) VALUES ($1)`,
      [filename]
    )
  })

  console.log(`✅ Migration completed: ${filename}`)
}

/**
 * Main migration runner.
 */
export async function runMigrations() {
  try {
    console.log("🔄 Starting migration process...")

    await ensureMigrationTable()

    const executed = await getExecutedMigrations()
    const files = getMigrationFiles()

    for (const file of files) {
      if (!executed.includes(file)) {
        await runMigration(file)
      } else {
        console.log(`⏩ Skipping already executed: ${file}`)
      }
    }

    console.log("🎉 All migrations up to date.")
  } catch (error) {
    console.error("❌ Migration failed:", error.message)
    process.exit(1)
  }
}

/**
 * Allow running directly via node migrate.js
 */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runMigrations()
}