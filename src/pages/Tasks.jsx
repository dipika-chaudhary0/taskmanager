import React, { useState, useEffect } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('Medium');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (!newTask) return;
    const task = { id: Date.now(), title: newTask, completed: false, category: 'General', priority };
    saveTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks(updated);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !== id);
    saveTasks(updated);
  };

  const filteredTasks = tasks.filter(t =>
    (category === 'All' || t.category === category) &&
    (status === 'All' || (status === 'Completed' ? t.completed : !t.completed)) &&
    (t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <h2>Tasks</h2>
      <input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Add new task" />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button onClick={addTask}>Add</button>

      <div>
        <label>Category:</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>All</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Study</option>
        </select>

        <label>Status:</label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option>All</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>

        <input type="text" placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
            {task.title} - {task.category} - {task.priority}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;