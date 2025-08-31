// File: src/pages/Dashboard.jsx

import React, { useState, useEffect, useContext } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line
} from 'recharts';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.length - completed;
  const overdue = tasks.filter(t => {
  if (!t.completed && t.dueDate) {
    const due = new Date(t.dueDate);
    const today = new Date();
    due.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    return due < today;
  }
  return false;
}).length;

  const dueToday = tasks.filter(t => !t.completed && new Date(t.dueDate).toDateString() === new Date().toDateString()).length;

  const pieData = [
    { name: 'Completed', value: completed },
    { name: 'Pending', value: pending }
  ];
  const COLORS = ['#00C49F', '#FF8042'];

  const priorities = ['High', 'Medium', 'Low'];
  const priorityData = priorities.map(p => ({
    priority: p,
    count: tasks.filter(t => t.priority === p).length
  }));

  const markTaskCompleted = (index) => {
  const updatedTasks = [...tasks];
  updatedTasks[index].completed = true;
  updatedTasks[index].completedDate = new Date().toISOString(); // add this
  setTasks(updatedTasks);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
};


  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const count = tasks.filter(t => t.completed && new Date(t.completedDate).toDateString() === date.toDateString()).length;
    return { date: formatted, completed: count };
  }).reverse();

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
  <h2>Menu</h2>
  <ul>
    <li onClick={() => navigate('/add-task')}>Add Task</li>
     <li onClick={() => navigate('/task-list')}>Task List</li>
  </ul>
</div>
      )}

      {/* Main content */}
      <div className="main-content">
        {/* Top bar */}
        <header className="top-bar">
          <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            &#9776; {/* Hamburger icon */}
          </div>
          <h1>Task Manager Dashboard</h1>
          <div className="user-menu">
            <div className="avatar" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            {dropdownOpen && (
              <div className="dropdown">
                <p onClick={() => navigate('/profile')}>Profile</p>
                <p onClick={logout}>Logout</p>
              </div>
            )}
          </div>
        </header>

        <main>
          {/* Summary cards */}
          <div className="cards">
            <div className="card total">
              <h3>Total Tasks</h3>
              <p>{tasks.length}</p>
            </div>
            <div className="card completed">
              <h3>Completed</h3>
              <p>{completed}</p>
            </div>
            <div className="card pending">
              <h3>Pending</h3>
              <p>{pending}</p>
            </div>
            <div className="card overdue">
              <h3>Overdue</h3>
              <p>{overdue}</p>
            </div>
            <div className="card due-today">
              <h3>Due Today</h3>
              <p>{dueToday}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="charts">
            <div className="chart pie">
              <h3>Task Completion</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart bar">
              <h3>Tasks by Priority</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priorityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="priority" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart line">
              <h3>Tasks Completed Last 7 Days</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={last7Days}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completed" stroke="#00C49F" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
