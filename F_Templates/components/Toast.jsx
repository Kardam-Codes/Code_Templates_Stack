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


/**
 * File: frontend/templates/components/Toast.jsx
 *
 * Purpose:
 * This component displays small notification messages to the user.
 *
 * Examples:
 * - "Login successful"
 * - "Error saving data"
 * - "Profile updated"
 *
 * Why this exists:
 * Toast messages improve feedback and demo clarity.
 *
 * This implementation is:
 * - Lightweight
 * - No external libraries
 * - Theme-compatible
 * - Safe and reusable
 */

import React, { useEffect } from "react";
import { useTheme } from "../theme/themeprovider";

/**
 * Toast Component
 *
 * Props:
 * message: string → text to show
 * type: "success" | "error" | "warning" | "info"
 * visible: boolean → controls visibility
 * onClose: function → called when toast closes
 * duration: number → auto-close time in ms (default: 3000)
 *
 * Example:
 * <Toast
 *   message="Saved successfully"
 *   type="success"
 *   visible={true}
 *   onClose={() => setVisible(false)}
 * />
 */
function Toast({
  message,
  type = "info",
  visible,
  onClose,
  duration = 3000,
}) {
  const { theme } = useTheme();

  /**
   * Auto-close after duration
   */
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  /**
   * Background color based on type
   */
  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return theme.colors.success;
      case "error":
        return theme.colors.error;
      case "warning":
        return theme.colors.warning;
      case "info":
      default:
        return theme.colors.info;
    }
  };

  const toastStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: getBackgroundColor(),
    color: "#ffffff",
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadow.md,
    zIndex: theme.zIndex.toast,
    minWidth: "200px",
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  };

  const closeButtonStyle = {
    marginLeft: theme.spacing.sm,
    cursor: "pointer",
    fontWeight: theme.fontWeight.bold,
  };

  return (
    <div style={toastStyle}>
      {message}

      {/* Close button */}
      <span style={closeButtonStyle} onClick={onClose}>
        ×
      </span>
    </div>
  );
}

export default Toast;
