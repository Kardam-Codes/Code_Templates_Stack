/**
 * FILE.service.ts
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
const TOKEN_KEY = "auth_token"
const USER_KEY = "auth_user"

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

function safeParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export const storageService = {
  setToken(token) {
    if (!isBrowser()) return
    if (!token) return
    window.localStorage.setItem(TOKEN_KEY, token)
  },

  getToken() {
    if (!isBrowser()) return null
    return window.localStorage.getItem(TOKEN_KEY)
  },

  clearToken() {
    if (!isBrowser()) return
    window.localStorage.removeItem(TOKEN_KEY)
  },

  setUser(user) {
    if (!isBrowser()) return
    if (!user) return
    window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  getUser() {
    if (!isBrowser()) return null
    const stored = window.localStorage.getItem(USER_KEY)
    if (!stored) return null
    return safeParse(stored)
  },

  clearUser() {
    if (!isBrowser()) return
    window.localStorage.removeItem(USER_KEY)
  },

  clearAuth() {
    this.clearToken()
    this.clearUser()
  },
}
