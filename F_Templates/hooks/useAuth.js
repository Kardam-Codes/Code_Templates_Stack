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
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { authService } from "../services/auth.service"
import { storageService } from "../services/storage.service"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    restoreSession()
  }, [])

  async function restoreSession() {
    setLoading(true)
    setError("")

    const storedToken = storageService.getToken()
    const storedUser = storageService.getUser()

    if (!storedToken) {
      setUser(null)
      setToken(null)
      setLoading(false)
      return
    }

    const response = await authService.getCurrentUser(storedToken)

    if (!response.success) {
      storageService.clearAuth()
      setUser(null)
      setToken(null)
      setError(response.message || "Session expired")
      setLoading(false)
      return
    }

    const hydratedUser = response?.data?.user || storedUser
    storageService.setToken(storedToken)
    if (hydratedUser) storageService.setUser(hydratedUser)

    setToken(storedToken)
    setUser(hydratedUser)
    setLoading(false)
  }

  async function signup(payload) {
    setLoading(true)
    setError("")

    const response = await authService.signup(payload)

    if (!response.success) {
      setError(response.message || "Signup failed")
      setLoading(false)
      return response
    }

    const nextToken = response?.data?.token
    const nextUser = response?.data?.user

    if (nextToken) storageService.setToken(nextToken)
    if (nextUser) storageService.setUser(nextUser)

    setToken(nextToken || null)
    setUser(nextUser || null)
    setLoading(false)

    return response
  }

  async function login(payload) {
    setLoading(true)
    setError("")

    const response = await authService.login(payload)

    if (!response.success) {
      setError(response.message || "Login failed")
      setLoading(false)
      return response
    }

    const nextToken = response?.data?.token
    const nextUser = response?.data?.user

    if (nextToken) storageService.setToken(nextToken)
    if (nextUser) storageService.setUser(nextUser)

    setToken(nextToken || null)
    setUser(nextUser || null)
    setLoading(false)

    return response
  }

  function logout() {
    storageService.clearAuth()
    setUser(null)
    setToken(null)
    setError("")
  }

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      isAuthenticated: Boolean(token && user),
      isAdmin: user?.role === "admin",
      signup,
      login,
      logout,
      restoreSession,
    }),
    [user, token, loading, error]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context
}
