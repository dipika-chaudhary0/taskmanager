import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <h2>Task Manager</h2>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;