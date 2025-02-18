import React from 'react';
import { deleteTask } from '../services/apiService';

const TaskList = ({ tasks, fetchTasks }) => {

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchTasks();  // Refresh tasks list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className='task-list'>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.name}</strong> (Status: {task.status})
            <p>{task.description}</p>
            <p>Due Date: {task.due_date}</p>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
