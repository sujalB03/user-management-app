import React, { useEffect, useState } from 'react';
import "./Modal/Modal.css";

const UserForm = ({ onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: {
      street: '',
      city: '',
    },
    company: {
      name: '',
    },
    website: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        username: user.username, // Keep username same when editing 
        // USER-username
      });
    } else {
      generateUsername('');
    }
  }, [user]);

  const generateUsername = (name) => {
    const formattedName = name.replace(/\s+/g, '').toLowerCase();
    setFormData((prev) => ({
      ...prev,
      username: `USER-${formattedName}`, // USER-username
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address')) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name.split('.')[1]]: value },
      }));
    } else {
      setFormData((prev) => {
        const newFormData = { ...prev, [name]: value };
        if (name === 'name') {
          generateUsername(value);
        }
        return newFormData;
      });
    }
  };

  // Validation form input fields
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address } = formData;
    if (!name || name.length < 3) return alert('Name is required and must be at least 3 characters.');
    if (!email || !/\S+@\S+\.\S+/.test(email)) return alert('Valid email is required.');
    if (!phone || !/^\d{10}$/.test(phone)) return alert('Please enter 10 digit phone number.');
    if (!address.street || !address.city) return alert('Address is required.');

    onSubmit(formData);
  };

  // Popup Modal or Dialog Starts
  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={formData.username} readOnly />
        </div>
        
        {/* Combined address inputs in a row and Company Detail in a row*/}
        <div className="form-group row">
          <div>
            <label htmlFor="address.street">Street</label>
            <input type="text" id="address.street" name="address.street" value={formData.address.street} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="address.city">City</label>
            <input type="text" id="address.city" name="address.city" value={formData.address.city} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group row">
          <div>
            <label htmlFor="company.name">Company Name</label>
            <input type="text" id="company.name" name="company.name" value={formData.company.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              
              onChange={handleChange}
              placeholder="e.g. http://example.com"
            />
          </div>
        </div>

        <div className="modal-actions">
          <button type="submit">{user ? 'Update' : 'Create'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
  // Popup Modal Ends
};

export default UserForm;
