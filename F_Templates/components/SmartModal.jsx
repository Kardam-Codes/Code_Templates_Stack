/**
 * FILE: SmartModal.jsx
 * OWNER: Misha
 *
 * PURPOSE:
 * Reusable modal dialog.
 *
 * FEATURES:
 * - Theme-aware
 * - Click outside to close
 * - Smooth overlay
 */

import React from "react"
import { useTheme } from "./theme/ThemeProvider"

function SmartModal({ isOpen, onClose, title, children }) {
  const { theme } = useTheme()

  if (!isOpen) return null

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={{
          ...styles.modal,
          background: theme.colors.surface,
          color: theme.colors.textPrimary,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.header}>
          <h3>{title}</h3>
          <button onClick={onClose} style={styles.closeBtn}>
            ✕
          </button>
        </div>

        <div style={styles.body}>{children}</div>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    width: "400px",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  body: {},
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
  },
}

export default SmartModal
