# 📡 API Reference Guide

Quick reference for all API endpoints in the Task Management Application.

---

## Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication
Currently no authentication required. Add JWT in future versions.

---

## 👥 Team Members Endpoints

### Get All Team Members
```http
GET /team-members
```
**Response:**
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "Designer",
    "color": "#3B82F6",
    "progress": 95,
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-15T14:30:00Z"
  }
]
```

### Get Specific Team Member
```http
GET /team-members/:id
```
**Parameters:**
- `id` (integer) - Team member ID

**Response:**
```json
{
  "id": 1,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "role": "Designer",
  "color": "#3B82F6",
  "progress": 95,
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

### Create Team Member
```http
POST /team-members
```
**Request Body:**
```json
{
  "name": "Bob Smith",
  "email": "bob@example.com",
  "role": "Developer",
  "color": "#8B5CF6",
  "progress": 80
}
```

**Response:** (201 Created)
```json
{
  "id": 5,
  "name": "Bob Smith",
  "email": "bob@example.com",
  "role": "Developer",
  "color": "#8B5CF6",
  "progress": 80,
  "created_at": "2024-01-20T10:00:00Z",
  "updated_at": "2024-01-20T10:00:00Z"
}
```

### Update Team Member
```http
PUT /team-members/:id
```
**Parameters:**
- `id` (integer) - Team member ID

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "role": "Senior Designer",
  "color": "#3B82F6",
  "progress": 98
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "role": "Senior Designer",
  "color": "#3B82F6",
  "progress": 98,
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-20T15:00:00Z"
}
```

### Delete Team Member
```http
DELETE /team-members/:id
```
**Parameters:**
- `id` (integer) - Team member ID

**Response:** (200 OK)
```json
{
  "message": "Team member deleted successfully"
}
```

---

## ✅ Tasks Endpoints

### Get All Tasks
```http
GET /tasks
```
**Response:**
```json
[
  {
    "id": 1,
    "title": "Design login page mockups",
    "description": "Create UI mockups for login page",
    "status": "draft",
    "priority": "High",
    "assignee_id": 1,
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-15T14:30:00Z"
  }
]
```

### Get Specific Task
```http
GET /tasks/:id
```
**Parameters:**
- `id` (integer) - Task ID

**Response:**
```json
{
  "id": 1,
  "title": "Design login page mockups",
  "description": "Create UI mockups for login page",
  "status": "draft",
  "priority": "High",
  "assignee_id": 1,
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

### Get Tasks by Status
```http
GET /tasks/status/:status
```
**Parameters:**
- `status` (string) - One of: `draft`, `in_progress`, `editing`, `done`

**Response:**
```json
[
  {
    "id": 1,
    "title": "Design login page mockups",
    "description": "Create UI mockups for login page",
    "status": "draft",
    "priority": "High",
    "assignee_id": 1,
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-15T14:30:00Z"
  }
]
```

### Create Task
```http
POST /tasks
```
**Request Body:**
```json
{
  "title": "Implement authentication",
  "description": "Add JWT-based authentication system",
  "status": "in_progress",
  "priority": "High",
  "assignee_id": 3
}
```

**Response:** (201 Created)
```json
{
  "id": 9,
  "title": "Implement authentication",
  "description": "Add JWT-based authentication system",
  "status": "in_progress",
  "priority": "High",
  "assignee_id": 3,
  "created_at": "2024-01-20T10:00:00Z",
  "updated_at": "2024-01-20T10:00:00Z"
}
```

### Update Task
```http
PUT /tasks/:id
```
**Parameters:**
- `id` (integer) - Task ID

**Request Body:**
```json
{
  "title": "Implement authentication",
  "description": "Add JWT-based authentication system with refresh tokens",
  "status": "in_progress",
  "priority": "High",
  "assignee_id": 3
}
```

**Response:**
```json
{
  "id": 9,
  "title": "Implement authentication",
  "description": "Add JWT-based authentication system with refresh tokens",
  "status": "in_progress",
  "priority": "High",
  "assignee_id": 3,
  "created_at": "2024-01-20T10:00:00Z",
  "updated_at": "2024-01-20T15:00:00Z"
}
```

### Delete Task
```http
DELETE /tasks/:id
```
**Parameters:**
- `id` (integer) - Task ID

**Response:** (200 OK)
```json
{
  "message": "Task deleted successfully"
}
```

---

## 📊 Statistics Endpoints

### Get Dashboard Statistics
```http
GET /statistics
```
**Response:**
```json
{
  "totalTasks": 12,
  "completedTasks": 2,
  "inProgressTasks": 3,
  "teamMembers": 4
}
```

---

## 🏥 Health Check

### Server Health
```http
GET /health
```
**Response:** (200 OK)
```json
{
  "status": "Server is running"
}
```

---

## 📋 Status Values

Valid values for task `status` field:
- `draft` - New task, not started
- `in_progress` - Currently being worked on
- `editing` - Under review/editing
- `done` - Completed

---

## 🎯 Priority Values

Valid values for task `priority` field:
- `Low` - Low priority task
- `Medium` - Medium priority task
- `High` - High priority task

---

## 🎨 Color Values

Examples of valid color values (hex format):
```
#3B82F6 (Blue)
#8B5CF6 (Purple)
#EC4899 (Pink)
#F59E0B (Amber)
#10B981 (Emerald)
#06B6D4 (Cyan)
#EF4444 (Red)
#6366F1 (Indigo)
```

---

## 💾 Data Types

### Team Member Object
```json
{
  "id": "integer",
  "name": "string (required)",
  "email": "string (required, unique)",
  "role": "string",
  "color": "string (hex color)",
  "progress": "integer (0-100)",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Task Object
```json
{
  "id": "integer",
  "title": "string (required)",
  "description": "string",
  "status": "enum (draft, in_progress, editing, done)",
  "priority": "enum (Low, Medium, High)",
  "assignee_id": "integer (foreign key)",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

---

## 🔄 Common HTTP Status Codes

- `200` - OK - Request successful
- `201` - Created - Resource created successfully
- `400` - Bad Request - Invalid request data
- `404` - Not Found - Resource not found
- `500` - Server Error - Internal server error

---

## 📝 Error Response Format

```json
{
  "error": "Error message describing what went wrong"
}
```

---

## 🧪 cURL Examples

### Get all team members
```bash
curl http://localhost:5000/api/team-members
```

### Create a new task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "status": "draft",
    "priority": "Medium",
    "assignee_id": 1
  }'
```

### Update a task
```bash
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "description": "Updated description",
    "status": "in_progress",
    "priority": "High",
    "assignee_id": 1
  }'
```

### Delete a task
```bash
curl -X DELETE http://localhost:5000/api/tasks/1
```

---

## 📚 Rate Limiting

Currently no rate limiting is implemented. Add in production deployment.

Recommended: 100 requests per minute per IP address

---

## 🔐 Security Notes

- Always validate input data
- Use HTTPS in production
- Implement authentication (JWT)
- Add rate limiting
- Sanitize user inputs
- Use environment variables for secrets
- Never expose database credentials

---

## 📞 Troubleshooting

### 404 Not Found
- Verify endpoint URL
- Check ID exists in database
- Review parameter names

### 500 Server Error
- Check backend logs
- Verify database connection
- Check request body format

### CORS Error
- Ensure backend CORS is configured
- Check frontend API URL
- Verify backend is running

---

**Last Updated:** January 2024  
**Version:** 1.0.0
