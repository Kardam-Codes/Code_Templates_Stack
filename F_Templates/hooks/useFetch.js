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

import { useCallback, useEffect, useState } from "react"
import { api } from "../services/api"

export default function useFetch(endpoint, options) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get(endpoint, options)

      if (response.success) {
        // Keep whole response so pages can read data + pagination consistently.
        setData(response)
      } else {
        setError(response.message || "Failed to fetch data")
      }
    } catch (err) {
      setError("Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }, [endpoint, refreshKey, options])

  useEffect(() => {
    let isMounted = true

    async function run() {
      if (!isMounted) return
      await fetchData()
    }

    run()

    return () => {
      isMounted = false
    }
  }, [fetchData])

  const refetch = () => setRefreshKey((prev) => prev + 1)

  return { data, loading, error, refetch }
}