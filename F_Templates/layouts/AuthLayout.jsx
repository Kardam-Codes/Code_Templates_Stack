/**
 * FILE: AuthLayout.jsx
 * OWNER: Kardam
 *
 * PURPOSE:
 * This layout wraps authentication-related pages
 * like Login and Signup.
 *
 * WHY THIS EXISTS:
 * - Prevent repeating centering logic
 * - Keep auth pages visually consistent
 * - Separate structure from form logic
 *
 * IMPORTANT RULES:
 * - No auth logic here
 * - No form validation here
 * - No API calls here
 * - Only layout structure
 */

import React from "react"
import { APP_CONFIG } from "../config/app.config"

/**
 * AuthLayout receives children.
 * These children will be Login or Signup pages.
 *
 * Example usage:
 *
 * <AuthLayout>
 *    <Login />
 * </AuthLayout>
 */
function AuthLayout({ children }) {
  return (
    <div style={styles.container}>
      
      {/* Optional branding section */}
      <div style={styles.brandSection}>
        <h1 style={styles.appName}>
          {APP_CONFIG.appName}
        </h1>
        <p style={styles.tagline}>
          Welcome back. Please sign in.
        </p>
      </div>

      {/* Main auth card area */}
      <div style={styles.card}>
        {children}
      </div>

    </div>
  )
}

/**
 * Simple inline styles.
 *
 * Why inline?
 * - Keeps template lightweight
 * - Misha will later improve theme system
 */
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f6f8",
  },
  brandSection: {
    textAlign: "center",
    marginBottom: "20px",
  },
  appName: {
    margin: 0,
  },
  tagline: {
    margin: "5px 0 0 0",
    color: "#666",
    fontSize: "14px",
  },
  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
}

export default AuthLayout
