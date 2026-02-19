/**
 * FILE: SmartTable.jsx
 * OWNER: Jay
 *
 * PURPOSE:
 * Reusable data table component.
 *
 * WHY:
 * - Avoid rewriting tables
 * - Accept dynamic columns and data
 */

import React from "react"

function SmartTable({ columns = [], data = [] }) {
  if (!data.length) {
    return <p>No records found.</p>
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} style={styles.th}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex} style={styles.td}>
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    padding: "8px",
  },
  td: {
    padding: "8px",
    borderBottom: "1px solid #f0f0f0",
  },
}

export default SmartTable
