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
import useFetch from "../hooks/useFetch";
import Table from "../components/Table";
import api from "../services/api";

const Admin = () => {
  const { data: users, loading, error, refetch } =
    useFetch("/users");

  const handleDelete = async (id) => {
    await api.delete(`/users/${id}`);
    refetch();
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="loading">{error}</p>;

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      {/* Stats Card */}
      <div className="card">
        <h2>Total Users</h2>
        <p>{users.length}</p>
      </div>

      {/* Table Section */}
      <div className="table-section">
        <h2>User Management</h2>

        <Table
          columns={[
            { header: "ID", accessor: "id" },
            { header: "Name", accessor: "name" },
            { header: "Email", accessor: "email" }
          ]}
          data={users}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Admin;
