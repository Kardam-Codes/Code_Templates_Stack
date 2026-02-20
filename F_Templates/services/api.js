/**
 * FILE: api.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Central API client for all HTTP requests.
 */

import { APP_CONFIG } from "../config/app.config.js"

const BASE_URL = "http://localhost:5000/api"
const TOKEN_KEY = "token"
const USER_KEY = "user"

function mockResponse() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: [],
        message: "Demo response",
      })
    }, 300)
  })
}

function getAuthHeaders() {
  const token = localStorage.getItem(TOKEN_KEY)

  if (!token) {
    return {}
  }

  return {
    Authorization: `Bearer ${token}`,
  }
}

function normalizeResponse(payload = {}, fallbackMessage = "Request completed") {
  return {
    success: typeof payload.success === "boolean" ? payload.success : true,
    data: payload.data ?? null,
    message: payload.message || fallbackMessage,
    pagination: payload.pagination,
  }
}

async function request(endpoint, options = {}) {
  try {
    if (APP_CONFIG.mode === "demo") {
      return await mockResponse()
    }

    const url = `${BASE_URL}${endpoint}`
    const headers = {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...(options.headers || {}),
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    let payload = {}
    try {
      payload = await response.json()
    } catch {
      payload = {}
    }

    if (response.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }

    if (!response.ok) {
      return {
        success: false,
        data: payload.data ?? null,
        message: payload.message || "Request failed",
      }
    }

    return normalizeResponse(payload)
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.message || "Network error",
    }
  }
}

export const api = {
  get(endpoint, options = {}) {
    return request(endpoint, { method: "GET", ...options })
  },
  post(endpoint, body, options = {}) {
    return request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    })
  },
  put(endpoint, body, options = {}) {
    return request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    })
  },
  delete(endpoint, options = {}) {
    return request(endpoint, { method: "DELETE", ...options })
  },
}

export default api
