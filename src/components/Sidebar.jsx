import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="sidebar">
    <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/tasks">Tasks</Link></li>
    </ul>
  </aside>
);

export default Sidebar;