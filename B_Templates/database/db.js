/**
 * FILE: db.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Initialize and manage database connection.
 *
 * WHY THIS EXISTS:
 * - Centralize DB connection logic
 * - Prevent connection code in services
 * - Make database switch easy in future
 *
 * IMPORTANT RULES:
 * - No business logic here
 * - No model logic here
 * - Only connection management
 */

import { ENV } from "../config/env.js"

/**
 * This object will hold our database connection.
 * For now, we use a simple in-memory fallback.
 *
 * In future, this can be replaced with:
 * - MongoDB
 * - PostgreSQL
 * - Prisma
 * - Sequelize
 */
let databaseInstance = null

/**
 * Connect to database
 */
export async function connectDatabase() {
  try {
    if (!ENV.DATABASE_URL) {
      console.log("⚡ No DATABASE_URL provided.")
      console.log("⚡ Using in-memory database (template mode).")

      databaseInstance = {
        type: "memory",
        data: {}, // simple key-value store
      }

      return databaseInstance
    }

    /**
     * Example: If real database URL exists
     * Here you would initialize real DB connection
     */
    console.log("🔌 Connecting to real database...")

    // Placeholder logic for real DB
    databaseInstance = {
      type: "external",
      url: ENV.DATABASE_URL,
    }

    console.log("✅ Database connected.")

    return databaseInstance

  } catch (error) {
    console.error("❌ Database connection failed:", error.message)
    process.exit(1)
  }
}

/**
 * Get current database instance
 * Ensures DB is initialized before use
 */
export function getDatabase() {
  if (!databaseInstance) {
    throw new Error("Database not initialized. Call connectDatabase() first.")
  }

  return databaseInstance
}
/**
 * FILE: db.js
 * OWNER: Jay (Usage Layer)
 *
 * PURPOSE:
 * Provide simple in-memory CRUD storage.
 *
 * NOTE:
 * This assumes connection is already initialized.
 */

let database = {
  users: [],
  admins: [],
}

let idCounter = 1

export function getCollection(name) {
  if (!database[name]) {
    database[name] = []
  }
  return database[name]
}

export function generateId() {
  return idCounter++
}
