const express = require('express');
const cors = require('cors');
const pg = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new pg.Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'task_management'
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
  } else {
    console.log('Database connected successfully');
    release();
  }
});

// ==================== TEAM MEMBERS ROUTES ====================

// Get all team members
app.get('/api/team-members', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM team_members ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// Get single team member
app.get('/api/team-members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM team_members WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({ error: 'Failed to fetch team member' });
  }
});

// Create team member
app.post('/api/team-members', async (req, res) => {
  try {
    const { name, email, role, color, progress } = req.body;
    
    const result = await pool.query(
      'INSERT INTO team_members (name, email, role, color, progress) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, role, color, progress]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ error: 'Failed to create team member' });
  }
});

// Update team member
app.put('/api/team-members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, color, progress } = req.body;
    
    const result = await pool.query(
      'UPDATE team_members SET name = $1, email = $2, role = $3, color = $4, progress = $5 WHERE id = $6 RETURNING *',
      [name, email, role, color, progress, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ error: 'Failed to update team member' });
  }
});

// Delete team member
app.delete('/api/team-members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM team_members WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

// ==================== TASKS ROUTES ====================

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get tasks by status
app.get('/api/tasks/status/:status', async (req, res) => {
  try {
    const { status } = req.params;
    const result = await pool.query('SELECT * FROM tasks WHERE status = $1 ORDER BY created_at DESC', [status]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get single task
app.get('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Create task
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, status, priority, assignee_id } = req.body;
    
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status, priority, assignee_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, status || 'draft', priority, assignee_id]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, assignee_id } = req.body;
    
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4, assignee_id = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [title, description, status, priority, assignee_id, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// ==================== STATISTICS ROUTES ====================

// Get dashboard statistics
app.get('/api/statistics', async (req, res) => {
  try {
    const totalTasks = await pool.query('SELECT COUNT(*) as count FROM tasks');
    const completedTasks = await pool.query('SELECT COUNT(*) as count FROM tasks WHERE status = $1', ['done']);
    const inProgressTasks = await pool.query('SELECT COUNT(*) as count FROM tasks WHERE status = $1', ['in_progress']);
    const teamCount = await pool.query('SELECT COUNT(*) as count FROM team_members');
    
    res.json({
      totalTasks: parseInt(totalTasks.rows[0].count),
      completedTasks: parseInt(completedTasks.rows[0].count),
      inProgressTasks: parseInt(inProgressTasks.rows[0].count),
      teamMembers: parseInt(teamCount.rows[0].count)
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// ==================== ERROR HANDLING ====================

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api\n`);
});

module.exports = app;
