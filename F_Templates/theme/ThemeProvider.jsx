/**
 * FILE: ThemeProvider.jsx
 * OWNER: Misha
 *
 * PURPOSE:
 * Provide global theme context to entire app.
 *
 * FEATURES:
 * - Switch between light, dark, brand themes
 * - Persist theme in localStorage
 * - Expose theme + toggle function
 * - Apply background styling automatically
 *
 * IMPORTANT:
 * - Wrap entire app inside this provider
 */

import React, { createContext, useContext, useEffect, useState } from "react"

import { lightTheme } from "./light"
import { darkTheme } from "./dark"
import { brandTheme } from "./brand"

// Create context
const ThemeContext = createContext()

// Map theme names to objects
const themeMap = {
  light: lightTheme,
  dark: darkTheme,
  brand: brandTheme,
}

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(() => {
    return localStorage.getItem("app-theme") || "light"
  })

  const theme = themeMap[themeName] || lightTheme

  // Persist theme to localStorage
  useEffect(() => {
    localStorage.setItem("app-theme", themeName)
  }, [themeName])

  // Apply background to body automatically
  useEffect(() => {
    document.body.style.backgroundColor = theme.colors.background
    document.body.style.color = theme.colors.textPrimary
    document.body.style.fontFamily = theme.font.family
  }, [theme])

  function toggleTheme() {
    const next =
      themeName === "light"
        ? "dark"
        : themeName === "dark"
        ? "brand"
        : "light"

    setThemeName(next)
  }

  function setTheme(name) {
    if (themeMap[name]) {
      setThemeName(name)
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeName,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook for easy usage
export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider")
  }

  return context
}
