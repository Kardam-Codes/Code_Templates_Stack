/**
 * FILE: useLocalStorage.js
 * OWNER: Misha
 *
 * PURPOSE:
 * Sync React state with localStorage.
 *
 * WHY:
 * - Persist user preferences
 * - Store auth tokens
 * - Keep theme selection
 */

import { useState, useEffect } from "react"

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch (error) {
      console.error("LocalStorage read error:", error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("LocalStorage write error:", error)
    }
  }, [key, value])

  return [value, setValue]
}
