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
 * File: frontend/templates/pages/NotFound.jsx
 *
 * Purpose:
 * This page is shown when a user navigates to a route that does not exist.
 *
 * Example:
 * - Wrong URL
 * - Deleted page
 * - Invalid route
 *
 * Why this exists:
 * Prevents blank screens and improves demo reliability.
 * Helps users safely return to the main application.
 *
 * This page is reusable across all hackathon projects.
 */

import React from "react";
import { useTheme } from "../theme/themeprovider";

/**
 * NotFound Page Component
 *
 * Example usage with React Router:
 * <Route path="*" element={<NotFound />} />
 */
function NotFound() {
  const { theme } = useTheme();

  /**
   * Styles
   */
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: theme.colors.background,
    color: theme.colors.text,
    textAlign: "center",
    padding: theme.spacing.lg,
  };

  const codeStyle = {
    fontSize: "64px",
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.sm,
  };

  const textStyle = {
    fontSize: theme.fontSize.lg,
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
   * Go back to home page
   * Safe fallback for demos
   */
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div style={containerStyle}>
      <div style={codeStyle}>404</div>

      <div style={textStyle}>Page not found</div>

      <button style={buttonStyle} onClick={handleGoHome}>
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
