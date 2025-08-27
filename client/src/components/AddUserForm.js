import React, { useState } from 'react';

const AddUserForm = ({ onUserAdded, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, isAdmin }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Failed to create user');
      }

      onUserAdded(data.user); // Pass the new user back to the parent
      onClose(); // Close the modal

    } catch (error) {
      console.error('Error creating user:', error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="new-username">Username</label>
        <input
          type="text"
          id="new-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="new-password">Password</label>
        <input
          type="password"
          id="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group checkbox-group">
        <label htmlFor="isAdmin">
          <input
            type="checkbox"
            id="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Is Admin
        </label>
      </div>
      <button type="submit" className="btn-submit">Create User</button>
    </form>
  );
};

export default AddUserForm;
