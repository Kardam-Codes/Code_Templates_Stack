/**OWNER NAME 
 * YUG
 * auth.service.js
 * Authentication Service
 *
 * PURPOSE:
 * - Handle user creation, authentication, and JWT token generation
 * - Reusable template for hackathons & fast builds
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
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = []; // Temporary in-memory storage

/*
  CREATE USER
*/
const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    role: "user"
  };

  users.push(newUser);

  return newUser;
};

/*
  AUTHENTICATE USER
*/
const authenticateUser = async (email, password) => {
  const user = users.find(u => u.email === email);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};

/*
  GENERATE TOKEN
*/
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "1h" }
  );
};

module.exports = {
  createUser,
  authenticateUser,
  generateToken
};