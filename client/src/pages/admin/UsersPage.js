import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import AddUserForm from '../../components/AddUserForm';
import './UsersPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  const handleUserAdded = (newUser) => {
    setUsers([...users, newUser]);
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users: {error}</p>;

  return (
    <div className="users-page">
      <h1>User Management</h1>
      <button className="add-user-btn" onClick={() => setIsModalOpen(true)}>
        Add New User
      </button>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New User">
        <AddUserForm onUserAdded={handleUserAdded} onClose={() => setIsModalOpen(false)} />
      </Modal>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.isAdmin ? 'Admin' : 'User'}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
