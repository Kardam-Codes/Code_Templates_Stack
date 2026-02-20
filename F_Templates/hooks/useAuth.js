import { createContext, useContext, useMemo, useState } from "react"
import { api } from "../services/api"

const TOKEN_KEY = "token"
const USER_KEY = "user"

const AuthContext = createContext(null)

function readStoredUser() {
  try {
    const value = localStorage.getItem(USER_KEY)
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(() => readStoredUser())

  const login = async ({ email, password }) => {
    const response = await api.post("/auth/login", { email, password })

    if (response.success && response.data?.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token)
      setToken(response.data.token)

      if (response.data?.user) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user))
        setUser(response.data.user)
      }
    }

    return response
  }

  const register = async ({ name, email, password }) => {
    const response = await api.post("/auth/register", { name, email, password })

    if (!response.success) {
      return response
    }

    if (response.data?.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token)
      setToken(response.data.token)

      if (response.data?.user) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user))
        setUser(response.data.user)
      }

      return response
    }

    return await login({ email, password })
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      login,
      register,
      logout,
      isAuthenticated: Boolean(token),
      user,
    }),
    [token, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
