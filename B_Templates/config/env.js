/**
 * FILE: env.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Load and centralize environment variables.
 *
 * WHY THIS EXISTS:
 * - Avoid using process.env everywhere
 * - Keep env access predictable
 * - Make configuration clean
 *
 * IMPORTANT:
 * - Only read environment variables here
 * - Do NOT put logic here
 */

import dotenv from "dotenv"

// Load variables from .env file
dotenv.config()

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "default_secret",
}
