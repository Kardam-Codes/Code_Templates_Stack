/**
 * FILE: App.jsx
 * OWNER: Kardam
 *
 * PURPOSE:
 * This is the root component of the frontend.
 * It connects routes, layouts, and pages together.
 *
 * WHY THIS EXISTS:
 * - Central routing system
 * - Layout selection logic
 * - Clean separation between config and rendering
 *
 * IMPORTANT RULES:
 * - No business logic here
 * - No data fetching here
 * - Only routing + layout composition
 */

import React from "react"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import { ROUTES } from "./templates/config/routes.config"
import { APP_CONFIG } from "./templates/config/app.config"

// Layouts
import DashboardLayout from "./templates/layouts/DashboardLayout"
import AuthLayout from "./templates/layouts/AuthLayout"

// Pages (basic placeholders for now)
import Login from "./templates/pages/Login"
import Signup from "./templates/pages/Signup"
import Dashboard from "./templates/pages/Dashboard"
import Profile from "./templates/pages/Profile"
import Admin from "./templates/pages/Admin"
import NotFound from "./templates/pages/NotFound"

/**
 * Map route "name" to actual page component
 *
 * This avoids importing inside routes config.
 * Separation of concerns maintained.
 */
const PAGE_COMPONENTS = {
  Login,
  Signup,
  Dashboard,
  Profile,
  Admin,
  NotFound,
}

/**
 * Function to wrap page with correct layout
 */
function renderWithLayout(route) {
  const PageComponent = PAGE_COMPONENTS[route.name]

  if (!PageComponent) {
    return <NotFound />
  }

  // Select layout
  if (route.layout === "dashboard") {
    return (
      <DashboardLayout>
        <PageComponent />
      </DashboardLayout>
    )
  }

  if (route.layout === "auth") {
    return (
      <AuthLayout>
        <PageComponent />
      </AuthLayout>
    )
  }

  // Default layout (public or fallback)
  return <PageComponent />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {ROUTES.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={renderWithLayout(route)}
          />
        ))}

      </Routes>
    </BrowserRouter>
  )
}

export default App
