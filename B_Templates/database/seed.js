/**
 * FILE.ts
 * OWNER
 *
 * PURPOSE:
 * - Reusable TEMPLATE for hackathons & fast builds
 *
 * YOU SHOULD:
 * - Implement the simplest working version
 * - Keep defaults predictable
 * - Make it reusable across projects
 *
 * DO NOT:
 * - Add business-specific logic
 * - Over-engineer
 * - Optimize prematurely
 *
 * NOTES:
 * - This file can be extended or deleted later
 * - Clarity > Cleverness
 */


/**
 * File: backend/templates/database/seed.js
 *
 * Purpose:
 * This file inserts demo/test data into the database.
 *
 * Why this exists:
 * During hackathons and demos, you need ready-made users and data
 * so you don't waste time manually creating accounts.
 *
 * This ensures:
 * - Fast demo setup
 * - Reliable testing
 * - Consistent development environment
 *
 * This file can be run manually when needed.
 *
 * Example usage:
 * node seed.js
 */

import mongoose from "mongoose";

/**
 * Example User Schema
 *
 * NOTE:
 * Replace this with your actual User model import
 *
 * Example:
 * import User from "../models/user.model.js";
 */
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

/**
 * Database connection
 *
 * Replace connection string with your config
 */
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hackathon-template";

/**
 * Seed function
 */
async function seedDatabase() {
  try {
    console.log("Connecting to database...");

    await mongoose.connect(MONGO_URI);

    console.log("Connected successfully");

    /**
     * Clear existing demo users (optional)
     */
    await User.deleteMany({});

    console.log("Old demo users cleared");

    /**
     * Insert demo users
     */
    const demoUsers = [
      {
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
      },
      {
        name: "Demo User",
        email: "user@example.com",
        role: "user",
      },
    ];

    await User.insertMany(demoUsers);

    console.log("Demo users created successfully");

    /**
     * Close connection
     */
    await mongoose.connection.close();

    console.log("Database connection closed");

    process.exit(0);

  } catch (error) {
    console.error("Seed error:", error);

    process.exit(1);
  }
}

/**
 * Run seed function
 */
seedDatabase();
