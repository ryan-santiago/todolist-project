const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a database pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  connectionLimit: 10
});

// Task Model
const taskModel = {
  async getAllTasks() {
    const [rows] = await pool.query('SELECT * FROM tasks');
    return rows;
  },

  async createTask({ name, description, due_date, status }) {
    const [result] = await pool.query(
      'INSERT INTO tasks (name, description, due_date, status) VALUES (?, ?, ?, ?)',
      [name, description, due_date, status]
    );
    return result.insertId;
  },

  async deleteTask(id) {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = taskModel;
