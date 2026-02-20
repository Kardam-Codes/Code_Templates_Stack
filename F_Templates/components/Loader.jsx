/**
 * FILE: Loader.jsx
 * OWNER: Misha
 *
 * PURPOSE:
 * Show loading state with consistent UI.
 *
 * FEATURES:
 * - Theme-aware colors
 * - Centered layout option
 */

import React from "react"
import { useTheme } from "../theme/ThemeProvider"

function Loader({ fullScreen = false }) {
  const { theme } = useTheme()

  return (
    <div
      style={{
        ...styles.container,
        ...(fullScreen ? styles.fullScreen : {}),
      }}
    >
      <div
        style={{
          ...styles.spinner,
          borderTop: `4px solid ${theme.colors.primary}`,
        }}
      />
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  fullScreen: {
    height: "100vh",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #ddd",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
}

// Inject keyframes once
const styleSheet = document.styleSheets[0]
if (styleSheet) {
  styleSheet.insertRule(
    `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
    styleSheet.cssRules.length
  )
}

export default Loader
