import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminPage() {
  const { accessToken } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: "", password: "", role: "user" });
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    const res = await api.get("/users", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post("/users", formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setFormData({ username: "", password: "", role: "user" });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({ username: user.username, password: "", role: user.role });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await api.put(`/users/${editUser._id}`, formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setEditUser(null);
    setFormData({ username: "", password: "", role: "user" });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    await api.delete(`/users/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    fetchUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <h3>{editUser ? "Edit User" : "Create User"}</h3>
      <form onSubmit={editUser ? handleUpdate : handleCreate} style={{ marginBottom: "20px" }}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">{editUser ? "Update" : "Add"}</button>
        {editUser && <button onClick={() => setEditUser(null)}>Cancel</button>}
      </form>

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>No users found</td>
            </tr>
          )}
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Edit</button>
                <button onClick={() => handleDelete(u._id)} style={{ color: "red" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
