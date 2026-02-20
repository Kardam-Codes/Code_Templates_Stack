/**
 * auth.routes.js
 * YUG
 *
 * PURPOSE:
 * - Handle authentication routes (signup, login, protected endpoints)
 * - Manage role-based access control
 *
 * YOU SHOULD:
 * - Keep routes simple and focused
 * - Use middleware for auth validation
 * - Make it reusable across projects
 *
 * DO NOT:
 * - Add business logic in routes
 * - Over-engineer responses
 * - Optimize prematurely
 *
 * NOTES:
 * - Extend with additional routes as needed
 * - Clarity > Cleverness
 */
const express = require("express");
const router = express.Router();

const { signup, login } = require("../controller/authController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/register", signup);
router.post("/login", login);

router.get("/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin",
    user: req.user
  });
});

module.exports = router;