/**
 * FILE: server.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Start backend server.
 *
 * RESPONSIBILITIES:
 * - Connect to PostgreSQL
 * - Run migrations (dev only)
 * - Start Express server
 * - Handle graceful shutdown
 */

import app from "./app.js"
import { ENV } from "../config/env.js"
import { connectDatabase, closeDatabase } from "../database/db.js"
import { runMigrations } from "../database/migrate.js"

const PORT = ENV.PORT

async function startServer() {
  try {
    // 1️⃣ Connect to PostgreSQL
    await connectDatabase()

    // 2️⃣ Run migrations ONLY in development
    if (ENV.NODE_ENV === "development") {
      await runMigrations()
    }

    // 3️⃣ Start server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })

    // 4️⃣ Graceful shutdown
    process.on("SIGINT", async () => {
      console.log("\n🛑 Shutting down server...")
      await closeDatabase()
      server.close(() => {
        console.log("🔌 Server closed.")
        process.exit(0)
      })
    })
  } catch (error) {
    console.error("❌ Failed to start server:", error.message)
    process.exit(1)
  }
}

startServer()