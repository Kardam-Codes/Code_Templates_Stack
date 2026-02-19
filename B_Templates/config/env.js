/**
 * FILE: env.js
 * BRANCH: odoo-ready
 *
 * PURPOSE:
 * Load and centralize environment variables
 * for PostgreSQL-based architecture.
 *
 * IMPORTANT:
 * - No logic here.
 * - Only read from process.env.
 * - All secrets stay in .env file.
 */

import dotenv from "dotenv"

dotenv.config()

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT ? Number(process.env.PORT) : 5000,

  // PostgreSQL configuration
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "odoo_hackathon",

  // Security
  JWT_SECRET: process.env.JWT_SECRET || "change_this_secret",

  // Debugging
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
}
