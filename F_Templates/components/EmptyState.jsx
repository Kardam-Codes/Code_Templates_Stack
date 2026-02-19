/**
 * FILE: EmptyState.jsx
 * OWNER: Jay
 *
 * PURPOSE:
 * Show a friendly message when no data exists.
 *
 * WHY:
 * - Avoid blank screens
 * - Improve UX clarity
 */

import React from "react"

function EmptyState({ message = "No data available." }) {
  return (
    <div style={styles.container}>
      <p>{message}</p>
    </div>
  )
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    color: "#777",
  },
}

export default EmptyState
