import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import TaskList from './pages/TaskList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App; // ✅ Make sure this is here
