import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from './UserForm';
import Modal from './Modal/Modal';
import ConfirmationModal from './Modal/ConfirmationModal';
import { toast } from 'react-toastify';
// ICONS npm for better UI
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';

const UserTable = ({ users, loading, error, setUsers }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Function to generate a new user ID starting from 11 as 10 Users are provided by the API
  const generateNewUserId = (users) => {
    const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 10;
    return maxId + 1;
  };

  const handleCreateOrUpdateUser = async (userData) => {
    try {
      let user;
      if (selectedUser) {
        // Update existing user
        user = { ...selectedUser, ...userData };
        setUsers((prev) => prev.map((u) => (u.id === selectedUser.id ? user : u)));
        toast.success('User updated successfully');
      } else {
        // Create new user with ID starting from 11
        const newId = generateNewUserId(users);
        user = { ...userData, id: newId };
        setUsers((prev) => [...prev, user]);
        toast.success('User created successfully');
      }
      setFormVisible(false);
      setSelectedUser(null);
    } catch (err) {
      toast.error('Error while saving user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success('User deleted successfully');
    } catch (err) {
      toast.error('Error while deleting user');
    } finally {
      setDeleteModalVisible(false);
    }
  };

  const handleViewUser = (id) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      // Navigate to Detailed page
      navigate(`/user/${id}`, { state: { user } }); // Passing the user data via state
    } else {
      toast.error('User not found');
    }
  };

  return (
    <div className="user-table-container">
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button className="create-user-btn" onClick={() => { setSelectedUser(null); setFormVisible(true); }}>
            <FontAwesomeIcon icon={faPlus} /> Create User
          </button>

          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.username}</td>
                  <td className='action-buttons'>
                    <button className='edit-btn' onClick={() => { setSelectedUser(user); setFormVisible(true); }}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className='delete-btn' onClick={() => { setSelectedUser(user); setDeleteModalVisible(true); }}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <button className='view-btn' onClick={() => handleViewUser(user.id)}>
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for creating or updating user */}
          <Modal
            show={isFormVisible}
            onClose={() => setFormVisible(false)}
            title={selectedUser ? "Edit User" : "Create User"}
          >
            <UserForm
              onClose={() => setFormVisible(false)}
              onSubmit={handleCreateOrUpdateUser}
              user={selectedUser}
            />
          </Modal>

          {/* Confirmation modal for deletion */}
          {isDeleteModalVisible && (
            <ConfirmationModal
              onClose={() => setDeleteModalVisible(false)}
              onConfirm={() => handleDeleteUser(selectedUser.id)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserTable;
