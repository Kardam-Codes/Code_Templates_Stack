/**
 * Dashboard.jsx
 * OWNER: JAY
 * PURPOSE:
 * - User management dashboard with CRUD operations
 * - Search and filter functionality
 * - Pagination support
 **/
import { useState, useEffect } from "react"
import useFetch from "../hooks/useFetch"
import SmartTable from "../components/SmartTable"
import Loader from "../components/Loader"
import EmptyState from "../components/EmptyState"
import api from "../services/api"

const Dashboard = () => {
  const [searchName, setSearchName] = useState("")
  const [searchEmail, setSearchEmail] = useState("")

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const [endpoint, setEndpoint] = useState(`/users?page=${page}&limit=${limit}`)

  useEffect(() => {
    let query = `/users?page=${page}&limit=${limit}`

    if (searchName) query += `&name=${searchName}`
    if (searchEmail) query += `&email=${searchEmail}`

    setEndpoint(query)
  }, [page, limit, searchName, searchEmail])

  const { data, loading, error, refetch } = useFetch(endpoint)

  const users = data?.data || []
  const pagination = data?.pagination || { page, limit, totalPages: 1 }

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleCreate = async () => {
    if (!name || !email) return

    await api.post("/users", { name, email })
    setName("")
    setEmail("")
    refetch()
  }

  const handleDelete = async (id) => {
    await api.delete(`/users/${id}`)
    refetch()
  }

  if (loading) return <Loader />
  if (error) return <EmptyState message={error} />

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="card">
        <h2>Add User</h2>

        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleCreate}>Add User</button>
        </div>
      </div>

      <div className="card">
        <h2>Filter Users</h2>

        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <input
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => {
              setPage(1)
              setSearchName(e.target.value)
            }}
          />
          <input
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => {
              setPage(1)
              setSearchEmail(e.target.value)
            }}
          />
          <button
            onClick={() => {
              setSearchName("")
              setSearchEmail("")
              setPage(1)
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="table-section">
        <h2>User List</h2>

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

export default Dashboard