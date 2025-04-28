import React, { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css";
import { supabase } from "../client";
import EyelinerComponent from "../components/Eyeliner/Eyeliner";
import ProductsDashboard from "../components/ProductsDashboard/ProductsDashboard";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [newUser, setNewUser] = useState({
    name: "",
    surname: "",
    email: "",
    date: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data: Users, error } = await supabase.from("Users").select("*");
    if (error) {
      console.error("Error fetching users:", error.message);
    } else {
      setUsers(Users);
    }
    setLoading(false);
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email) {
      alert("Name and Email are required!");
      return;
    }

    const { data, error } = await supabase.from("Users").insert([newUser]);
    if (error) {
      console.error("Error adding user:", error.message);
    } else {
      setNewUser({ name: "", surname: "", email: "", date: "" });
      fetchUsers();
    }
  };

  const handleDeleteUser = async (id) => {
    const { error } = await supabase.from("Users").delete().eq("id", id);
    if (error) {
      console.error("Error deleting user:", error.message);
    } else {
      fetchUsers();
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    const { error } = await supabase
      .from("Users")
      .update({
        name: editingUser.name,
        surname: editingUser.surname,
        email: editingUser.email,
        date: editingUser.date,
      })
      .eq("id", editingUser.id);

    if (error) {
      console.error("Error updating user:", error.message);
    } else {
      setEditingUser(null);
      fetchUsers();
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <EyelinerComponent name="dashboard" />

      <div className={styles.dashboard}>
        <h1 className={styles.title}>User Dashboard</h1>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search}
        />

        <div className={styles.addUserForm}>
          <h2>Add New User</h2>
          <input
            className={styles.addUserInput}
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            className={styles.addUserInput}
            type="text"
            placeholder="Surname"
            value={newUser.surname}
            onChange={(e) =>
              setNewUser({ ...newUser, surname: e.target.value })
            }
          />
          <input
            className={styles.addUserInput}
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            className={styles.addUserInput}
            type="date"
            placeholder="Date of Birth"
            value={newUser.date}
            onChange={(e) => setNewUser({ ...newUser, date: e.target.value })}
          />
          <button onClick={handleAddUser} className={styles.addButton}>
            Add User
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editingUser?.id === user.id ? (
                    <input
                      value={editingUser.name}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, name: e.target.value })
                      }
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingUser?.id === user.id ? (
                    <input
                      value={editingUser.surname}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          surname: e.target.value,
                        })
                      }
                    />
                  ) : (
                    user.surname
                  )}
                </td>
                <td>
                  {editingUser?.id === user.id ? (
                    <input
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUser?.id === user.id ? (
                    <input
                      type="date"
                      value={editingUser.date}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, date: e.target.value })
                      }
                    />
                  ) : user.date ? (
                    new Date(user.date).toLocaleDateString()
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {editingUser?.id === user.id ? (
                    <>
                      <button
                        onClick={handleUpdateUser}
                        className={styles.saveButton}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className={styles.cancelButton}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditUser(user)}
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ProductsDashboard />
    </>
  );
}

export default Dashboard;
