import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './UserDetail.css';

const UserDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { user } = state || {};

  if (!user) {
    return <p>No user data available for ID {id}!</p>;
  }

  return (
    <div className="user-detail">
      <h2>{user.name}</h2>
       <p>Email: {user.email}</p>
       <p>Phone: {user.phone}</p>
       <p>Username: {user.username}</p>
       <p>Street: {user.address.street}</p>
       <p>City: {user.address.city}</p>
       <p>Company: {user.company.name}</p>
       <p>Website: {user.website}</p>
    </div>
  );
};

export default UserDetail;
