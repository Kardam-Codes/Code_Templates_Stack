/**
 * FILE.service.ts
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
import { api } from "./api"

export const authService = {
  async signup(payload) {
    return api.post("/auth/register", payload)
  },

  async login(payload) {
    return api.post("/auth/login", payload)
  },

  async getCurrentUser(token) {
    if (!token) {
      return { success: false, message: "Missing token" }
    }

    return api.get("/auth/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}
