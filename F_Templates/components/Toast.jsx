/**
 * FILE: Toast.jsx
 * OWNER: Misha
 *
 * PURPOSE:
 * Global notification system.
 *
 * FEATURES:
 * - Success / Error / Info types
 * - Auto-dismiss
 * - Theme-aware
 */

import React, { createContext, useContext, useState } from "react"
import { useTheme } from "./theme/ThemeProvider"

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const { theme } = useTheme()

  function showToast(message, type = "info", duration = 3000) {
    const id = Date.now()

    const newToast = { id, message, type }
    setToasts((prev) => [...prev, newToast])

    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  function removeToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div style={styles.container}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              ...styles.toast,
              background: getBackground(toast.type, theme),
              color: "#fff",
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function getBackground(type, theme) {
  switch (type) {
    case "success":
      return theme.colors.success
    case "error":
      return theme.colors.danger
    default:
      return theme.colors.primary
  }
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider")
  }
  return context
}

const styles = {
  container: {
    position: "fixed",
    top: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    zIndex: 9999,
  },
  toast: {
    padding: "12px 16px",
    borderRadius: "8px",
    minWidth: "200px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
}
