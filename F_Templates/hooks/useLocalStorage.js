/**
 * FILE.ts
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
 * File: frontend/templates/hooks/useLocalStorage.js
 *
 * Purpose:
 * This is a reusable React hook for storing and retrieving values
 * from the browser's localStorage safely.
 *
 * Why this exists:
 * localStorage allows data persistence across page refreshes.
 * Examples:
 * - saving theme preference
 * - saving auth tokens
 * - saving user settings
 *
 * This hook makes localStorage easier and safer to use.
 *
 * Demo safety:
 * Includes error handling to prevent crashes if localStorage fails.
 */

import { useState } from "react";

/**
 * useLocalStorage Hook
 *
 * @param {string} key - localStorage key
 * @param {any} initialValue - default value if nothing exists
 *
 * Usage example:
 * const [theme, setTheme] = useLocalStorage("theme", "light");
 */
function useLocalStorage(key, initialValue) {
  /**
   * Load initial value from localStorage
   */
  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(key);

      // Parse stored JSON or return initial value
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("localStorage read error:", error);
      return initialValue;
    }
  };

  const [value, setValue] = useState(getStoredValue);

  /**
   * Save value to localStorage and state
   */
  const setStoredValue = (newValue) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error("localStorage write error:", error);
    }
  };

  return [value, setStoredValue];
}

export default useLocalStorage;
