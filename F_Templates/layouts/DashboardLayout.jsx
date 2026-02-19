/**
 * FILE: DashboardLayout.jsx
 * OWNER: Kardam
 *
 * PURPOSE:
 * This layout wraps all dashboard-related pages.
 *
 * WHY THIS EXISTS:
 * - Prevent repeating sidebar + header in every page
 * - Keep structure consistent
 * - Separate structure from page content
 *
 * IMPORTANT RULES:
 * - No data fetching here
 * - No business logic here
 * - Only layout structure
 */

import React from "react"
import { Link } from "react-router-dom"
import { APP_CONFIG } from "../config/app.config"

/**
 * DashboardLayout receives "children"
 *
 * children = the page content inside layout
 *
 * Example:
 * <DashboardLayout>
 *    <Dashboard />
 * </DashboardLayout>
 */
function DashboardLayout({ children }) {
  return (
    <div style={styles.container}>
      
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>
          {APP_CONFIG.appName}
        </h2>

        {/* Navigation Links */}
        <nav style={styles.nav}>
          <Link to="/dashboard" style={styles.link}>
            Dashboard
          </Link>

          <Link to="/profile" style={styles.link}>
            Profile
          </Link>

          {/* Admin link only visible if feature enabled */}
          {APP_CONFIG.features.admin && (
            <Link to="/admin" style={styles.link}>
              Admin
            </Link>
          )}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div style={styles.main}>
        
        {/* Top Header */}
        <header style={styles.header}>
          <span>Welcome</span>
          <button style={styles.logoutButton}>
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main style={styles.content}>
          {children}
        </main>

      </div>
    </div>
  )
}

/**
 * Basic inline styles
 *
 * We keep styling simple for now.
 * Misha will later improve theme system.
 */
const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "220px",
    background: "#111",
    color: "#fff",
    padding: "20px",
  },
  logo: {
    marginBottom: "20px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "15px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
  },
  logoutButton: {
    padding: "6px 12px",
    cursor: "pointer",
  },
  content: {
    padding: "20px",
    overflowY: "auto",
  },
}

export default DashboardLayout
