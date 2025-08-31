import React, { useState, useEffect } from "react";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // no <any[]>
  const [editingTask, setEditingTask] = useState(null); // no : number | null
  const [editForm, setEditForm] = useState({
    title: "",
    category: "Work",
    priority: "Medium",
    dueDate: "",
    completed: false,
    completedDate: null,
  });
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // <-- added search term

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleEditClick = (index) => {
    setEditingTask(index);
    setEditForm({ ...tasks[index] });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTasks = [...tasks];
    if (editingTask !== null) {
      updatedTasks[editingTask] = {
        ...editForm,
        completedDate: editForm.completed
          ? editForm.completedDate || new Date().toISOString()
          : null,
      };
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setEditingTask(null);
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    const isCompleted = !updatedTasks[index].completed;
    updatedTasks[index].completed = isCompleted;
    updatedTasks[index].completedDate = isCompleted
      ? new Date().toISOString()
      : null;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  if (tasks.length === 0)
    return <p className="no-tasks">No tasks added yet.</p>;

  return (
    <div className="task-list-page">
      <h2>Task List</h2>

      <div className="filter-container">
  <div className="search-box">
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  <div className="category-filter">
    <label>Filter by Category: </label>
    <select
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
    >
      <option value="All">All</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Shopping">Shopping</option>
      <option value="Others">Others</option>
    </select>
  </div>
</div>
      <table className="task-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Completed</th>
            <th>Completion Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks
            .filter(
              (task) =>
                (filterCategory === "All" || task.category === filterCategory) &&
                task.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.category}</td>
                <td>{task.priority}</td>
                <td>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(index)}
                  />
                </td>
                <td>
                  {task.completedDate
                    ? new Date(task.completedDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingTask !== null && (
        <div className="modal-overlay" onClick={() => setEditingTask(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Task</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                placeholder="Title"
                required
              />
              <select
                name="category"
                value={editForm.category || "General"}
                onChange={handleEditChange}
                required
              >
                {["Work", "Personal", "Shopping", "Others"].map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <select
                name="priority"
                value={editForm.priority}
                onChange={handleEditChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <input
                type="date"
                name="dueDate"
                value={editForm.dueDate || ""}
                onChange={handleEditChange}
                required
              />
              <label>
                <input
                  type="checkbox"
                  name="completed"
                  checked={editForm.completed}
                  onChange={handleEditChange}
                />{" "}
                Completed
              </label>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
