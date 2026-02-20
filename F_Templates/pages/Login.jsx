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
import React, { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

function Login() {
  const navigate = useNavigate()
  const { login, loading, error, isAuthenticated } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()
    setFormError("")

    if (!email.trim() || !password.trim()) {
      setFormError("Email and password are required")
      return
    }

    const response = await login({ email, password })
    if (response.success) {
      navigate("/dashboard", { replace: true })
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={styles.input}
            autoComplete="email"
          />
        </label>

        <label style={styles.label}>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={styles.input}
            autoComplete="current-password"
          />
        </label>

        {(formError || error) && <p style={styles.error}>{formError || error}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p style={styles.footer}>
        No account? <Link to="/signup">Create one</Link>
      </p>
    </div>
  )
}

const styles = {
  label: {
    display: "block",
    marginBottom: "12px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    marginTop: "6px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#222",
    color: "#fff",
    cursor: "pointer",
    marginTop: "8px",
  },
  error: {
    color: "#b42318",
    margin: "8px 0",
    fontSize: "13px",
  },
  footer: {
    marginTop: "16px",
    fontSize: "14px",
  },
}

export default Login
