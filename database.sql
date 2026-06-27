-- Task Management Database Schema
-- Run this script to initialize the database

-- Create database
-- CREATE DATABASE task_management;

-- ==================== TEAM MEMBERS TABLE ====================
CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(100),
  color VARCHAR(7) NOT NULL,
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== TASKS TABLE ====================
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'editing', 'done')),
  priority VARCHAR(20) DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High')),
  assignee_id INTEGER REFERENCES team_members(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== ACTIVITY LOG TABLE ====================
CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES team_members(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== COMMENTS TABLE ====================
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  author_id INTEGER REFERENCES team_members(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== INDEXES ====================
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee ON tasks(assignee_id);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_task ON activity_logs(task_id);
CREATE INDEX IF NOT EXISTS idx_comments_task ON comments(task_id);

-- ==================== SAMPLE DATA ====================
INSERT INTO team_members (name, email, role, color, progress) VALUES
  ('Alice Johnson', 'alice@example.com', 'Designer', '#3B82F6', 95),
  ('Bob Smith', 'bob@example.com', 'Developer', '#8B5CF6', 80),
  ('Carol White', 'carol@example.com', 'Frontend Dev', '#EC4899', 65),
  ('David Brown', 'david@example.com', 'Backend Dev', '#F59E0B', 75)
ON CONFLICT (email) DO NOTHING;

INSERT INTO tasks (title, description, status, priority, assignee_id) VALUES
  ('Redesign landing page', 'Update the landing page design with new branding', 'draft', 'High', 1),
  ('Update documentation', 'Add API documentation and examples', 'draft', 'Medium', 2),
  ('Implement authentication', 'Add JWT-based authentication system', 'in_progress', 'High', 3),
  ('Database migration', 'Migrate from MongoDB to PostgreSQL', 'in_progress', 'High', 4),
  ('Code review process', 'Establish code review guidelines and process', 'editing', 'Medium', 1),
  ('Testing framework setup', 'Set up Jest and testing infrastructure', 'editing', 'Low', 2),
  ('Design system creation', 'Create reusable component library', 'done', 'High', 3),
  ('API endpoints documented', 'Document all REST API endpoints', 'done', 'Medium', 4)
ON CONFLICT DO NOTHING;

-- ==================== CREATE UPDATED_AT TRIGGER ====================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON team_members
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==================== VIEWS ====================

-- Task summary view
CREATE OR REPLACE VIEW task_summary AS
SELECT
  t.id,
  t.title,
  t.description,
  t.status,
  t.priority,
  t.assignee_id,
  tm.name as assignee_name,
  tm.color as assignee_color,
  t.created_at,
  t.updated_at,
  (SELECT COUNT(*) FROM comments WHERE task_id = t.id) as comment_count
FROM tasks t
LEFT JOIN team_members tm ON t.assignee_id = tm.id
ORDER BY t.created_at DESC;

-- Team performance view
CREATE OR REPLACE VIEW team_performance AS
SELECT
  tm.id,
  tm.name,
  tm.email,
  tm.role,
  tm.color,
  tm.progress,
  (SELECT COUNT(*) FROM tasks WHERE assignee_id = tm.id) as assigned_tasks,
  (SELECT COUNT(*) FROM tasks WHERE assignee_id = tm.id AND status = 'done') as completed_tasks,
  (SELECT COUNT(*) FROM tasks WHERE assignee_id = tm.id AND status = 'in_progress') as in_progress_tasks
FROM team_members tm
ORDER BY tm.id;

-- ==================== END OF SCHEMA ====================

GRANT ALL PRIVILEGES ON DATABASE task_management TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
