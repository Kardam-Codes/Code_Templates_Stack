/**
 * File: frontend/templates/theme/ThemeProvider.jsx
 *
 * Purpose:
 * This file provides the theme system to the entire application.
 * It allows switching between light, dark, and brand themes safely.
 *
 * Why this exists:
 * Instead of hardcoding colors inside components,
 * components will read values from the active theme.
 *
 * This makes the UI:
 * - Consistent
 * - Easy to customize
 * - Demo-safe
 * - Reusable across hackathons
 *
 * This uses React Context (simple and beginner-friendly).
 */

import React, { createContext, useContext, useState, useEffect } from "react";

import lightTheme from "./light";
import darkTheme from "./dark";
import brandTheme from "./brand";

/**
 * All available themes
 */
const themes = {
  light: lightTheme,
  dark: darkTheme,
  brand: brandTheme,
};

/**
 * Create context
 */
const ThemeContext = createContext();

/**
 * ThemeProvider component
 *
 * Wrap your app with this provider
 * so all components can access theme values.
 */
export function ThemeProvider({ children }) {
  /**
   * Default theme is light
   */
  const [themeName, setThemeName] = useState("light");

  /**
   * Load saved theme from localStorage (if exists)
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");

    if (savedTheme && themes[savedTheme]) {
      setThemeName(savedTheme);
    }
  }, []);

  /**
   * Save theme whenever it changes
   */
  useEffect(() => {
    localStorage.setItem("app-theme", themeName);
  }, [themeName]);

  /**
   * Change theme function
   */
  const setTheme = (name) => {
    if (themes[name]) {
      setThemeName(name);
    }
  };

  /**
   * Active theme object
   */
  const theme = themes[themeName];

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to use theme easily in components
 *
 * Example:
 * const { theme, setTheme } = useTheme();
 */
export function useTheme() {
  return useContext(ThemeContext);
}
