// API Utility Functions
// All API calls go through this file

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ==================== TEAM MEMBERS API ====================

export const teamMembersAPI = {
  // Get all team members
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/team-members`);
      if (!response.ok) throw new Error('Failed to fetch team members');
      return await response.json();
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  },

  // Get single team member
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/team-members/${id}`);
      if (!response.ok) throw new Error('Failed to fetch team member');
      return await response.json();
    } catch (error) {
      console.error('Error fetching team member:', error);
      throw error;
    }
  },

  // Create new team member
  create: async (memberData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/team-members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData)
      });
      if (!response.ok) throw new Error('Failed to create team member');
      return await response.json();
    } catch (error) {
      console.error('Error creating team member:', error);
      throw error;
    }
  },

  // Update team member
  update: async (id, memberData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/team-members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData)
      });
      if (!response.ok) throw new Error('Failed to update team member');
      return await response.json();
    } catch (error) {
      console.error('Error updating team member:', error);
      throw error;
    }
  },

  // Delete team member
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/team-members/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete team member');
      return await response.json();
    } catch (error) {
      console.error('Error deleting team member:', error);
      throw error;
    }
  }
};

// ==================== TASKS API ====================

export const tasksAPI = {
  // Get all tasks
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Get single task
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
      if (!response.ok) throw new Error('Failed to fetch task');
      return await response.json();
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  },

  // Get tasks by status
  getByStatus: async (status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/status/${status}`);
      if (!response.ok) throw new Error('Failed to fetch tasks by status');
      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks by status:', error);
      throw error;
    }
  },

  // Create new task
  create: async (taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (!response.ok) throw new Error('Failed to create task');
      return await response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update task
  update: async (id, taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (!response.ok) throw new Error('Failed to update task');
      return await response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete task
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete task');
      return await response.json();
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};

// ==================== STATISTICS API ====================

export const statisticsAPI = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/statistics`);
      if (!response.ok) throw new Error('Failed to fetch statistics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  }
};

// ==================== HEALTH CHECK ====================

export const healthAPI = {
  // Check server health
  check: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) throw new Error('Server is not responding');
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
};

// ==================== ERROR HANDLER ====================

export const handleAPIError = (error) => {
  if (error.message === 'Failed to fetch') {
    return 'Unable to connect to server. Please ensure the backend is running.';
  }
  return error.message || 'An error occurred';
};

export default {
  teamMembersAPI,
  tasksAPI,
  statisticsAPI,
  healthAPI,
  handleAPIError
};
