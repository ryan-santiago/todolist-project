import React, { useState } from 'react';
import { createTask } from '../services/apiService';

const TaskForm = ({ fetchTasks }) => {
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    due_date: '',
    status: 'Pending',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(taskData);
      fetchTasks();  // Refresh tasks list
      setTaskData({
        name: '',
        description: '',
        due_date: '',
        status: 'Pending',
      });
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Task Name"
        value={taskData.name}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={taskData.description}
        onChange={handleInputChange}
        required
      />
      <input
        type="date"
        name="due_date"
        value={taskData.due_date}
        onChange={handleInputChange}
        required
      />
      <select
        name="status"
        value={taskData.status}
        onChange={handleInputChange}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
