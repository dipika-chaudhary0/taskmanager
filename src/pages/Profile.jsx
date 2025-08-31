import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <div className="avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
