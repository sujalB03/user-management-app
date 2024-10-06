import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserTable from './components/UserTable';
import UserDetail from './components/UserDetail';
import { fetchUsers } from './api';

// Toastify npm
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<UserTable users={users} loading={loading} error={error} setUsers={setUsers} />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
};

export default App;
