import React, { useState, useEffect } from 'react';
import './TaskManagement.css';

export default function TaskManagement() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [teamMembers, setTeamMembers] = useState([]);
  const [tasks, setTasks] = useState({
    draft: [],
    inProgress: [],
    editing: [],
    done: []
  });
  const [loading, setLoading] = useState(true);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'draft',
    priority: 'Medium',
    assignee: ''
  });

  // Fetch data from backend
  useEffect(() => {
    fetchTeamMembers();
    fetchTasks();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/team-members');
      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      const data = await response.json();
      
      const groupedTasks = {
        draft: data.filter(t => t.status === 'draft'),
        inProgress: data.filter(t => t.status === 'in_progress'),
        editing: data.filter(t => t.status === 'editing'),
        done: data.filter(t => t.status === 'done')
      };
      
      setTasks(groupedTasks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask)
      });
      
      if (response.ok) {
        setNewTask({ title: '', description: '', status: 'draft', priority: 'Medium', assignee: '' });
        setShowNewTaskModal(false);
        fetchTasks();
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const getMemberColor = (memberId) => {
    const member = teamMembers.find(m => m.id === memberId);
    return member ? member.color : '#6B7280';
  };

  const getMemberInitials = (memberId) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      return member.name.split(' ').map(n => n[0]).join('');
    }
    return 'NA';
  };

  const TaskCard = ({ task }) => (
    <div className="task-card">
      <p className="task-title">{task.title}</p>
      <div className="task-meta">
        <div className="task-assignee">
          <div 
            className="avatar" 
            style={{ background: getMemberColor(task.assignee_id) }}
          >
            {getMemberInitials(task.assignee_id)}
          </div>
          <span className="assignee-name">
            {teamMembers.find(m => m.id === task.assignee_id)?.name.split(' ')[0]}
          </span>
        </div>
        <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>
    </div>
  );

  const Column = ({ title, tasks }) => (
    <div className="kanban-column">
      <h3 className="column-title">
        {title}
        <span className="task-count">{tasks.length}</span>
      </h3>
      <div className="tasks-container">
        {tasks.map(task => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="task-management">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="menu-icon">≡</div>
          <p className="sidebar-title">Tasks - Today</p>
        </div>

        <nav className="sidebar-nav">
          {['Dashboard', 'Project', 'Team', 'Planning', 'Analytics', 'Finance'].map((item) => (
            <div
              key={item}
              className={`nav-item ${activeNav === item ? 'active' : ''}`}
              onClick={() => setActiveNav(item)}
            >
              {item.toUpperCase()}
            </div>
          ))}
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* TOP BAR */}
        <div className="top-bar">
          <h1 className="page-title">Task Management</h1>
          <div className="top-bar-links">
            <span>Pricing</span>
            <span>About</span>
            <span>Language</span>
            <span>Conditions</span>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="content-wrapper">
          {/* LEFT SECTION */}
          <div className="left-section">
            {/* TEAM PERFORMANCE */}
            <div className="performance-section">
              <h2 className="section-title">Team Performance</h2>
              <div className="performance-list">
                {teamMembers.map(member => (
                  <div key={member.id} className="performance-card">
                    <div className="perf-header">
                      <div 
                        className="perf-avatar" 
                        style={{ background: member.color }}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <p className="member-name">{member.name}</p>
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar"
                        style={{
                          width: `${member.progress}%`,
                          background: `linear-gradient(90deg, ${member.color}, ${member.color}cc)`
                        }}
                      >
                        <span className="progress-percentage">{member.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KANBAN BOARD */}
            <div className="kanban-section">
              <div className="kanban-header">
                <h2 className="section-title">Tasks by Status</h2>
                <button 
                  className="btn-new-task"
                  onClick={() => setShowNewTaskModal(true)}
                >
                  + New Task
                </button>
              </div>
              <div className="kanban-board">
                <Column title="Draft" tasks={tasks.draft} />
                <Column title="In Progress" tasks={tasks.inProgress} />
                <Column title="Editing" tasks={tasks.editing} />
                <Column title="Done" tasks={tasks.done} />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="right-sidebar">
            {/* PROFILE CARD */}
            <div className="profile-card">
              <div className="profile-avatar-large">YN</div>
              <h3 className="profile-name">Name Surname</h3>
              <p className="profile-role">Project Manager</p>
              
              <div className="profile-schedule">
                <p className="schedule-title">PLAN</p>
                <div className="schedule-items">
                  <div className="schedule-item">
                    <p className="schedule-time">12:00 - 16:00</p>
                    <p className="schedule-event">Meeting</p>
                  </div>
                  <div className="schedule-item">
                    <p className="schedule-time">18:00 - 19:00</p>
                    <p className="schedule-event">Call</p>
                  </div>
                </div>
              </div>
            </div>

            {/* EFFICIENCY CARD */}
            <div className="efficiency-card">
              <h3 className="card-title">Efficiency</h3>
              <div className="efficiency-grid">
                {[
                  { label: 'A', value: 85, color: '#3B82F6' },
                  { label: 'B', value: 72, color: '#8B5CF6' },
                  { label: 'C', value: 68, color: '#EC4899' },
                  { label: 'D', value: 90, color: '#F59E0B' }
                ].map((item, idx) => (
                  <div key={idx} className="efficiency-item">
                    <div 
                      className="efficiency-circle"
                      style={{ background: item.color }}
                    >
                      {item.value}%
                    </div>
                    <p className="efficiency-label">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* COMPLETED TASKS CHART */}
            <div className="completed-tasks-card">
              <h3 className="card-title">Completed Tasks</h3>
              <div className="chart-bars">
                {[
                  { label: '200', color: '#3B82F6' },
                  { label: '150', color: '#8B5CF6' },
                  { label: '170', color: '#EC4899' },
                  { label: '160', color: '#F59E0B' }
                ].map((bar, idx) => (
                  <div key={idx} className="chart-bar-item">
                    <div 
                      className="chart-bar"
                      style={{
                        height: `${(parseInt(bar.label) / 200) * 100}px`,
                        background: bar.color
                      }}
                    ></div>
                    <p className="bar-label">{bar.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW TASK MODAL */}
      {showNewTaskModal && (
        <div className="modal-overlay" onClick={() => setShowNewTaskModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Create New Task</h2>
            <form onSubmit={handleAddTask}>
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  required
                  placeholder="Enter task title"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Enter task description"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                  >
                    <option value="draft">Draft</option>
                    <option value="in_progress">In Progress</option>
                    <option value="editing">Editing</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Assign To</label>
                <select
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                  required
                >
                  <option value="">Select team member</option>
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-buttons">
                <button type="button" className="btn-cancel" onClick={() => setShowNewTaskModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
