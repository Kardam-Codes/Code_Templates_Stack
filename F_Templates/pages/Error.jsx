/**
 * File: frontend/templates/pages/Error.jsx
 *
 * Purpose:
 * This page displays a generic error message when something goes wrong.
 *
 * Examples:
 * - Server crash
 * - Network failure
 * - Unexpected frontend error
 *
 * Why this exists:
 * Instead of showing a blank screen or crashing,
 * this page ensures demo safety and good user experience.
 *
 * This page is reusable across all hackathon projects.
 */

import React from "react";
import { useTheme } from "../theme/themeprovider";

/**
 * Error Page Component
 *
 * Props:
 * message: optional custom error message
 *
 * Example:
 * <Error message="Failed to load dashboard" />
 */
function Error({ message = "Something went wrong." }) {
  const { theme } = useTheme();

  /**
   * Container styling
   */
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: theme.colors.background,
    color: theme.colors.text,
    padding: theme.spacing.lg,
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.md,
  };

  const messageStyle = {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  };

  const buttonStyle = {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    background: theme.colors.primary,
    color: "#ffffff",
    border: "none",
    borderRadius: theme.radius.md,
    cursor: "pointer",
    fontSize: theme.fontSize.md,
  };

  /**
   * Reload page handler
   */
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Error</div>

      <div style={messageStyle}>{message}</div>

      <button style={buttonStyle} onClick={handleReload}>
        Reload Page
      </button>
    </div>
  );
}

export default Error;
