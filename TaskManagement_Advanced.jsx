import React, { useState, useEffect } from 'react';
import { tasksAPI, teamMembersAPI, statisticsAPI, handleAPIError } from './api';
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
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'draft',
    priority: 'Medium',
    assignee_id: ''
  });

  // Load data on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [membersData, tasksData, statsData] = await Promise.all([
        teamMembersAPI.getAll(),
        tasksAPI.getAll(),
        statisticsAPI.getDashboardStats()
      ]);

      setTeamMembers(membersData);
      setStatistics(statsData);

      const groupedTasks = {
        draft: tasksData.filter(t => t.status === 'draft'),
        inProgress: tasksData.filter(t => t.status === 'in_progress'),
        editing: tasksData.filter(t => t.status === 'editing'),
        done: tasksData.filter(t => t.status === 'done')
      };

      setTasks(groupedTasks);
    } catch (err) {
      setError(handleAPIError(err));
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    
    if (!newTask.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    if (!newTask.assignee_id) {
      alert('Please assign the task to someone');
      return;
    }

    try {
      const createdTask = await tasksAPI.create({
        ...newTask,
        assignee_id: parseInt(newTask.assignee_id)
      });

      // Add to local state
      const status = newTask.status;
      setTasks(prev => ({
        ...prev,
        [status]: [...prev[status], createdTask]
      }));

      // Reset form
      setNewTask({
        title: '',
        description: '',
        status: 'draft',
        priority: 'Medium',
        assignee_id: ''
      });
      setShowNewTaskModal(false);
      
      // Refresh statistics
      loadAllData();
    } catch (err) {
      alert('Error creating task: ' + handleAPIError(err));
    }
  };

  const handleDeleteTask = async (taskId, status) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.delete(taskId);
        setTasks(prev => ({
          ...prev,
          [status]: prev[status].filter(t => t.id !== taskId)
        }));
      } catch (err) {
        alert('Error deleting task: ' + handleAPIError(err));
      }
    }
  };

  const handleDragStart = (task, status) => {
    setDraggedTask({ task, fromStatus: status });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, toStatus) => {
    e.preventDefault();
    
    if (!draggedTask) return;

    const { task, fromStatus } = draggedTask;

    if (fromStatus === toStatus) {
      setDraggedTask(null);
      return;
    }

    try {
      // Update task status in backend
      const updatedTask = await tasksAPI.update(task.id, {
        ...task,
        status: toStatus
      });

      // Update local state
      setTasks(prev => ({
        ...prev,
        [fromStatus]: prev[fromStatus].filter(t => t.id !== task.id),
        [toStatus]: [...prev[toStatus], updatedTask]
      }));

      setDraggedTask(null);
    } catch (err) {
      alert('Error moving task: ' + handleAPIError(err));
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

  const getMemberName = (memberId) => {
    const member = teamMembers.find(m => m.id === memberId);
    return member ? member.name.split(' ')[0] : 'Unassigned';
  };

  const TaskCard = ({ task, status }) => (
    <div 
      className="task-card"
      draggable
      onDragStart={() => handleDragStart(task, status)}
      style={{
        opacity: draggedTask?.task.id === task.id ? 0.5 : 1,
        cursor: 'move'
      }}
    >
      <div className="task-card-header">
        <p className="task-title">{task.title}</p>
        <button
          className="task-delete-btn"
          onClick={() => handleDeleteTask(task.id, status)}
          title="Delete task"
        >
          ✕
        </button>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-meta">
        <div className="task-assignee">
          <div 
            className="avatar" 
            style={{ background: getMemberColor(task.assignee_id) }}
            title={getMemberName(task.assignee_id)}
          >
            {getMemberInitials(task.assignee_id)}
          </div>
          <span className="assignee-name">
            {getMemberName(task.assignee_id)}
          </span>
        </div>
        <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>
    </div>
  );

  const Column = ({ title, status, taskList }) => (
    <div 
      className="kanban-column"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, status)}
      style={{
        backgroundColor: draggedTask?.fromStatus !== status && draggedTask ? '#F0F9FF' : 'transparent',
        transition: 'background-color 0.2s'
      }}
    >
      <h3 className="column-title">
        {title}
        <span className="task-count">{taskList.length}</span>
      </h3>
      <div className="tasks-container">
        {taskList.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet</p>
            <small>Drag tasks here or create new ones</small>
          </div>
        ) : (
          taskList.map(task => <TaskCard key={task.id} task={task} status={status} />)
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={loadAllData} className="btn-retry">
          Retry
        </button>
      </div>
    );
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
          {[
            { label: 'Dashboard', icon: '📊' },
            { label: 'Project', icon: '📁' },
            { label: 'Team', icon: '👥' },
            { label: 'Planning', icon: '📋' },
            { label: 'Analytics', icon: '📈' },
            { label: 'Finance', icon: '💰' }
          ].map((item) => (
            <div
              key={item.label}
              className={`nav-item ${activeNav === item.label ? 'active' : ''}`}
              onClick={() => setActiveNav(item.label)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label.toUpperCase()}
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
                {teamMembers.length === 0 ? (
                  <p className="no-data">No team members yet</p>
                ) : (
                  teamMembers.map(member => (
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
                  ))
                )}
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
                <Column title="Draft" status="draft" taskList={tasks.draft} />
                <Column title="In Progress" status="in_progress" taskList={tasks.inProgress} />
                <Column title="Editing" status="editing" taskList={tasks.editing} />
                <Column title="Done" status="done" taskList={tasks.done} />
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

            {/* STATISTICS CARD */}
            {statistics && (
              <div className="statistics-card">
                <h3 className="card-title">Overview</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <p className="stat-value">{statistics.totalTasks}</p>
                    <p className="stat-label">Total Tasks</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-value">{statistics.inProgressTasks}</p>
                    <p className="stat-label">In Progress</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-value">{statistics.completedTasks}</p>
                    <p className="stat-label">Completed</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-value">{statistics.teamMembers}</p>
                    <p className="stat-label">Team Size</p>
                  </div>
                </div>
              </div>
            )}

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
                <label>Task Title *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Enter task title"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Enter task description (optional)"
                  rows="3"
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
                <label>Assign To *</label>
                <select
                  value={newTask.assignee_id}
                  onChange={(e) => setNewTask({...newTask, assignee_id: e.target.value})}
                >
                  <option value="">Select a team member</option>
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.role})
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
