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
 * File: frontend/templates/components/Loader.jsx
 *
 * Purpose:
 * This is a simple reusable loading spinner component.
 *
 * Why this exists:
 * During API calls or page loading, we show a loader
 * to indicate that something is happening.
 *
 * This improves user experience and demo reliability.
 *
 * This component is:
 * - Lightweight
 * - No external libraries
 * - Theme-compatible
 * - Safe for hackathon demos
 */

import React from "react";
import { useTheme } from "../theme/themeprovider";

/**
 * Loader Component
 *
 * Props:
 * size: number (optional) → size of spinner in pixels
 *
 * Example:
 * <Loader />
 * <Loader size={40} />
 */
function Loader({ size = 32 }) {
  const { theme } = useTheme();

  const spinnerStyle = {
    width: size,
    height: size,
    border: `3px solid ${theme.colors.border}`,
    borderTop: `3px solid ${theme.colors.primary}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.md,
  };

  return (
    <div style={containerStyle}>
      {/* Spinner */}
      <div style={spinnerStyle} />

      {/* Inline animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Loader;
