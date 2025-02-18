const express = require('express');
const taskModel = require('../models/taskModel');
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks.' });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const { name, description, due_date, status } = req.body;
  try {
    const taskId = await taskModel.createTask({ name, description, due_date, status });
    res.status(201).json({ id: taskId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task.' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await taskModel.deleteTask(id);
    if (deleted) {
      res.json({ message: 'Task deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Task not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task.' });
  }
});

module.exports = router;
