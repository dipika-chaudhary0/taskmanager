import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTask.css';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const categories = ['Work', 'Personal', 'Shopping', 'Others'];
  const priorities = ['High', 'Medium', 'Low'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      category,
      priority,
      dueDate,
      completed: false,
    };

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    alert('Task added successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="add-task-page">
      <div className="add-task-card">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="" disabled>Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
            <option value="" disabled>Select Priority</option>
            {priorities.map((p, idx) => (
              <option key={idx} value={p}>{p}</option>
            ))}
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
