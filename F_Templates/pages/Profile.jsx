/**
 * FILE.tsx
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
import React from "react"
import { useAuth } from "../hooks/useAuth"

function Profile() {
  const { user } = useAuth()

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Profile</h1>
      <p>Name: {user?.name || "-"}</p>
      <p>Email: {user?.email || "-"}</p>
      <p>Role: {user?.role || "user"}</p>
    </div>
  )
}

export default Profile
