/**
 * FILE: api.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * This file acts as a central API client.
 * Instead of calling fetch() everywhere in the app,
 * we call functions from here.
 *
 * WHY THIS EXISTS:
 * - Prevent duplicate fetch logic
 * - Support demo mode easily
 * - Centralize error handling
 * - Make backend switching easy
 *
 * IMPORTANT RULES:
 * - No UI logic here
 * - No business logic here
 * - Only request handling
 */

import { APP_CONFIG } from "../config/app.config"

/**
 * Base URL of backend server
 * In real hackathon, change this once here.
 */
const BASE_URL = "http://localhost:5000/api"

/**
 * Helper function to simulate demo data.
 * This runs when APP_CONFIG.mode === "demo"
 */
function mockResponse(endpoint, options) {
  console.log("⚡ Demo Mode Active → Returning Mock Data")

  // You can expand this later
  // Keep it simple for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: [],
        message: "Demo response"
      })
    }, 500)
  })
}

/**
 * Core request function
 * All GET/POST/PUT/DELETE calls use this internally
 */
async function request(endpoint, options = {}) {
  try {
    /**
     * If app is in demo mode,
     * skip real backend and return mock data
     */
    if (APP_CONFIG.mode === "demo") {
      return await mockResponse(endpoint, options)
    }

    /**
     * Build full URL
     */
    const url = `${BASE_URL}${endpoint}`

    /**
     * Default fetch configuration
     */
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    }

    /**
     * Make real network request
     */
    const response = await fetch(url, config)

    /**
     * Convert response to JSON
     */
    const data = await response.json()

    /**
     * Handle HTTP errors
     */
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong")
    }

    return data

  } catch (error) {
    console.error("API Error:", error.message)

    /**
     * Standard error structure
     */
    return {
      success: false,
      message: error.message,
    }
  }
}

/**
 * Public API Methods
 * These are what the rest of the app uses.
 */
export const api = {
  get: (endpoint) =>
    request(endpoint, {
      method: "GET",
    }),

  post: (endpoint, body) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (endpoint, body) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (endpoint) =>
    request(endpoint, {
      method: "DELETE",
    }),
}
