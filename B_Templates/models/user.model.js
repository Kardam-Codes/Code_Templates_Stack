/**
 * user.model.js
 * OWNER: YUG
 * PURPOSE:
 * - User schema with authentication support
 * - Password hashing and verification
 * - Role-based access control
 *
 * FEATURES:
 * - Automatic password hashing on save
 * - Password comparison method
 * - Timestamps for audit trail
 * - Email validation and uniqueness
 *
 * NOTES:
 * - Uses bcrypt for secure password hashing
 * - Pre-save hook handles password encryption
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, { timestamps: true });

// Pre-save hook to hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);