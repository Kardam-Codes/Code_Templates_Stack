/**
 * FILE: NotFound.jsx
 * OWNER: Misha
 *
 * PURPOSE:
 * Display 404 page when route not found.
 *
 * FEATURES:
 * - Theme-aware styling
 * - Navigation back to dashboard
 */

import React from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../theme/ThemeProvider"

function NotFound() {
  const { theme } = useTheme()

  return (
    <div
      style={{
        ...styles.container,
        background: theme.colors.background,
        color: theme.colors.textPrimary,
      }}
    >
      <h1 style={styles.code}>404</h1>
      <p style={styles.message}>Oops! Page not found.</p>

      <Link
        to="/dashboard"
        style={{
          ...styles.button,
          background: theme.colors.primary,
        }}
      >
        Go to Dashboard
      </Link>
    </div>
  )
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  code: {
    fontSize: "72px",
    margin: "0",
  },
  message: {
    margin: "10px 0 20px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    color: "#fff",
    textDecoration: "none",
  },
}

export default NotFound
