/**
 * FILE: PublicLayout.jsx
 * OWNER: Kardam
 *
 * PURPOSE:
 * Layout for public pages (non-authenticated users).
 *
 * WHY THIS EXISTS:
 * - Separate public structure from dashboard
 * - Keep clean simple layout
 *
 * IMPORTANT:
 * - No auth logic
 * - No data fetching
 * - Only structure
 */

import React from "react"
import { Link } from "react-router-dom"
import { APP_CONFIG } from "../config/app.config"

function PublicLayout({ children }) {
  return (
    <div style={styles.container}>

      {/* Simple top navbar */}
      <header style={styles.header}>
        <h2>{APP_CONFIG.appName}</h2>

        <nav>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/signup" style={styles.link}>Signup</Link>
        </nav>
      </header>

      {/* Page Content */}
      <main style={styles.content}>
        {children}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <small>© {new Date().getFullYear()} {APP_CONFIG.appName}</small>
      </footer>

    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #ddd",
  },
  link: {
    marginLeft: "10px",
    textDecoration: "none",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  footer: {
    padding: "10px",
    textAlign: "center",
    borderTop: "1px solid #ddd",
  },
}

export default PublicLayout
