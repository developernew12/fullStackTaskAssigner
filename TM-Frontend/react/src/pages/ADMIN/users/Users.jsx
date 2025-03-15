import React, { useEffect, useState } from "react";
import instance from "../../../services/axiosInstance";
import styles from "./users.module.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await instance.get("/admin/users-tasks");
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (userData) =>
      userData.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userData.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2>All Users & Their Tasks</h2>

      <input
        type="text"
        placeholder="Search users by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      {loading ? (
        <p>Loading users...</p>
      ) : filteredUsers.length > 0 ? (
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Assigned Tasks</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(({ user, tasks }) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {tasks.length > 0 ? (
                    <ul className={styles.tasksTitle}>
                      {tasks.map((task) => (
                        <li key={task._id}>{task.title}</li>
                      ))}
                    </ul>
                  ) : (
                    "No tasks assigned"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No matching users found.</p>
      )}
    </div>
  );
};

export default Users;
