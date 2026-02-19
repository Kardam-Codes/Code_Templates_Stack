/**
 * FILE: seed.js
 * OWNER: Misha
 *
 * PURPOSE:
 * Seed initial demo data for hackathon use.
 *
 * WHY:
 * - Prevent empty dashboard during demo
 * - Ensure app feels alive immediately
 */

import { getCollection, generateId } from "./db.js"

export function seedDatabase() {
  const users = getCollection("users")
  const admins = getCollection("admins")
  const audits = getCollection("audits")

  // Prevent duplicate seeding
  if (users.length > 0 || admins.length > 0) {
    console.log("🌱 Seed already exists. Skipping seeding.")
    return
  }

  // Seed Users
  users.push(
    {
      id: generateId(),
      name: "John Doe",
      email: "john@example.com",
      role: "user",
    },
    {
      id: generateId(),
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
    }
  )

  // Seed Admin
  admins.push({
    id: generateId(),
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  })

  // Seed Audit logs
  audits.push({
    id: generateId(),
    action: "Database seeded",
    timestamp: new Date().toISOString(),
  })

  console.log("🌱 Database seeded successfully.")
}
