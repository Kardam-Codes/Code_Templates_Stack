/**
 * FILE: Admin.jsx
 * OWNER: Jay
 *
 * PURPOSE:
 * Admin management page.
 *
 * RESPONSIBILITY:
 * - Display administrative data
 * - Use same reusable components
 */
import { useMemo, useState } from "react"
import useFetch from "../hooks/useFetch"
import SmartTable from "../components/SmartTable"
import Loader from "../components/Loader"
import EmptyState from "../components/EmptyState"

const Admin = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  // Backend currently exposes admin-manageable user listing at /users.
  const endpoint = useMemo(() => `/users?page=${page}&limit=${limit}`, [page, limit])
  const { data, loading, error } = useFetch(endpoint)

  const users = data?.data || []
  const pagination = data?.pagination || { page, limit, totalPages: 1, total: 0 }

  if (loading) return <Loader />
  if (error) return <EmptyState message={error} />

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      <div className="card">
        <h2>Total Users</h2>
        <p>{pagination.total ?? users.length}</p>
      </div>

      <div className="table-section">
        <h2>User Management</h2>

        {users.length === 0 ? (
          <EmptyState message="No users found." />
        ) : (
          <SmartTable
            columns={[
              { label: "ID", key: "id" },
              { label: "Name", key: "name" },
              { label: "Email", key: "email" },
            ]}
            data={users}
          />
        )}

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={pagination.page === 1}
            >
              Previous
            </button>

            <span style={{ margin: "0 10px" }}>
              Page {pagination.page} of {pagination.totalPages || 1}
            </span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={pagination.page >= (pagination.totalPages || 1)}
            >
              Next
            </button>
          </div>

          <div>
            <label>Rows per page: </label>
            <select
              value={limit}
              onChange={(e) => {
                setPage(1)
                setLimit(Number(e.target.value))
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin