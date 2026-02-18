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
 * File: frontend/templates/components/SmartModal.jsx
 *
 * Purpose:
 * This is a reusable modal (popup) component.
 *
 * Examples:
 * - Confirm delete dialog
 * - Edit form popup
 * - Information popup
 *
 * Why this exists:
 * Modals allow focused user interaction without navigating away.
 *
 * This implementation is:
 * - Lightweight
 * - Theme-compatible
 * - No external libraries
 * - Demo-safe
 * - Easy to reuse
 */

import React, { useEffect } from "react";
import { useTheme } from "../theme/themeprovider";

/**
 * SmartModal Component
 *
 * Props:
 * open: boolean → controls visibility
 * title: string → modal title
 * children: JSX → modal content
 * onClose: function → called when modal closes
 *
 * Example:
 * <SmartModal open={true} title="Confirm" onClose={handleClose}>
 *   Are you sure?
 * </SmartModal>
 */
function SmartModal({ open, title, children, onClose }) {
  const { theme } = useTheme();

  /**
   * Close modal on ESC key press
   */
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  /**
   * Styles
   */
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: theme.zIndex.modal,
  };

  const modalStyle = {
    background: theme.colors.surface,
    color: theme.colors.text,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    boxShadow: theme.shadow.lg,
    minWidth: "300px",
    maxWidth: "500px",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  };

  const closeButtonStyle = {
    cursor: "pointer",
    border: "none",
    background: "transparent",
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
  };

  /**
   * Prevent click inside modal from closing
   */
  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={stopPropagation}>
        {/* Header */}
        <div style={headerStyle}>
          <span>{title}</span>

          <button style={closeButtonStyle} onClick={onClose}>
            ×
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default SmartModal;
