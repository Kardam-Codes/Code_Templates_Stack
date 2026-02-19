/**
 * FILE: useFetch.js
 * OWNER: Jay
 *
 * PURPOSE:
 * Reusable data fetching hook.
 *
 * WHY THIS EXISTS:
 * - Avoid repeating fetch logic in pages
 * - Standardize loading & error handling
 *
 * RULES:
 * - No UI here
 * - Only data logic
 */

import { useEffect, useState } from "react"
import { api } from "../services/api"

export function useFetch(endpoint, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        setLoading(true)
        const response = await api.get(endpoint)

        if (isMounted) {
          if (response.success) {
            setData(response.data)
          } else {
            setError(response.message)
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch data")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [endpoint])

  return { data, loading, error }
}
