import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ROUTES } from "../config/routes.config"
import { AuthProvider } from "../hooks/useAuth"
import useAuth from "../hooks/useAuth"
import { ThemeProvider } from "../theme/ThemeProvider"
import { ToastProvider } from "../components/Toast"

import AuthLayout from "../layouts/AuthLayout"
import DashboardLayout from "../layouts/DashboardLayout"
import PublicLayout from "../layouts/PublicLayout"

import Admin from "../pages/Admin"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import NotFound from "../pages/NotFound"
import Profile from "../pages/Profile"
import Signup from "../pages/Signup"

const PAGE_COMPONENTS = {
  Admin,
  Dashboard,
  Login,
  NotFound,
  Profile,
  Signup,
}

const LAYOUT_COMPONENTS = {
  auth: AuthLayout,
  dashboard: DashboardLayout,
  public: PublicLayout,
}

function RouteRenderer({ route }) {
  const { isAuthenticated } = useAuth()
  const PageComponent = PAGE_COMPONENTS[route.name] || NotFound
  const LayoutComponent = LAYOUT_COMPONENTS[route.layout] || React.Fragment
  const isPrivateRoute = route.layout === "dashboard"
  const isAuthRoute = route.layout === "auth"

  if (isPrivateRoute && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (isAuthRoute && isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  if (LayoutComponent === React.Fragment) {
    return <PageComponent />
  }

  return (
    <LayoutComponent>
      <PageComponent />
    </LayoutComponent>
  )
}

function AppRoutes() {
  return (
    <Routes>
      {ROUTES.map((route) => (
        <Route
          key={`${route.path}-${route.name}`}
          path={route.path}
          element={<RouteRenderer route={route} />}
        />
      ))}
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
