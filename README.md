# 📊 Task Management Application

A modern, full-stack task management application with real-time collaboration features, drag-and-drop kanban board, and comprehensive team management.

![Status](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌟 Features

### Core Features
✅ **Kanban Board** - Organize tasks by status (Draft → In Progress → Editing → Done)  
✅ **Drag & Drop** - Move tasks between columns with intuitive drag-and-drop  
✅ **Team Management** - Track team members with performance metrics  
✅ **Progress Tracking** - Real-time progress bars for each team member  
✅ **Task Management** - Create, update, and delete tasks with full details  
✅ **Priority Levels** - Assign Low, Medium, or High priority to tasks  
✅ **Task Assignment** - Assign tasks to team members with color-coded avatars  
✅ **Dashboard Analytics** - View statistics and performance metrics  

### Technical Features
✅ **RESTful API** - Complete API with CRUD operations  
✅ **PostgreSQL Database** - Robust data storage and management  
✅ **Real-time UI** - Instant updates without page refresh  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Error Handling** - Comprehensive error messages and recovery  
✅ **Loading States** - Smooth loading indicators and transitions  
✅ **Modal Forms** - Clean modal interface for creating tasks  
✅ **Performance Optimized** - Fast load times and smooth animations  

---

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 18.2.0
- Modern CSS with animations
- Fetch API for HTTP requests
- Responsive design

**Backend:**
- Node.js with Express
- PostgreSQL database
- RESTful API design
- CORS enabled

**Database:**
- PostgreSQL 12+
- Normalized schema
- Indexes for performance
- Views for analytics

---

## 📁 Project Structure

```
task-management/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── TaskManagement_Advanced.jsx    (Main component with features)
│   │   ├── TaskManagement_Advanced.css    (Styling)
│   │   ├── api.js                         (API utilities)
│   │   ├── App.js                         (App wrapper)
│   │   ├── index.js                       (Entry point)
│   │   └── index.css                      (Global styles)
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── server.js                          (Express server)
│   ├── database.sql                       (Database schema)
│   ├── package.json
│   └── .env
│
└── README.md (this file)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- PostgreSQL 12+
- Git

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd task-management
   ```

2. **Setup Database**
   ```bash
   psql -U postgres
   CREATE DATABASE task_management;
   \c task_management
   ```
   Then run the database.sql file

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   npm run dev
   ```

4. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

---

## 📡 API Documentation

### Team Members

**GET /api/team-members**
- Get all team members
- Response: Array of team member objects

**GET /api/team-members/:id**
- Get specific team member
- Response: Team member object

**POST /api/team-members**
- Create new team member
- Body: `{ name, email, role, color, progress }`
- Response: Created team member object

**PUT /api/team-members/:id**
- Update team member
- Body: `{ name, email, role, color, progress }`
- Response: Updated team member object

**DELETE /api/team-members/:id**
- Delete team member
- Response: Success message

### Tasks

**GET /api/tasks**
- Get all tasks
- Response: Array of task objects

**GET /api/tasks/:id**
- Get specific task
- Response: Task object

**GET /api/tasks/status/:status**
- Get tasks by status
- Status: draft, in_progress, editing, done
- Response: Array of task objects

**POST /api/tasks**
- Create new task
- Body: `{ title, description, status, priority, assignee_id }`
- Response: Created task object

**PUT /api/tasks/:id**
- Update task
- Body: `{ title, description, status, priority, assignee_id }`
- Response: Updated task object

**DELETE /api/tasks/:id**
- Delete task
- Response: Success message

### Statistics

**GET /api/statistics**
- Get dashboard statistics
- Response: `{ totalTasks, completedTasks, inProgressTasks, teamMembers }`

**GET /api/health**
- Server health check
- Response: `{ status: "Server is running" }`

---

## 🎨 UI Components

### Kanban Board
- Drag-and-drop task management
- Four status columns
- Visual feedback during dragging
- Empty state messages

### Task Cards
- Task title and description
- Assignee avatar with initials
- Priority badge (High, Medium, Low)
- Delete button
- Hover effects

### Team Performance
- Team member avatars
- Progress bars with percentages
- Gradient backgrounds
- Hover animations

### Dashboard Cards
- Profile card with schedule
- Statistics overview
- Efficiency metrics
- Completed tasks chart

---

## 🎯 User Guide

### Creating a Task
1. Click "New Task" button
2. Fill in task title (required)
3. Add optional description
4. Select status (Draft, In Progress, Editing, Done)
5. Choose priority level
6. Assign to team member (required)
7. Click "Create Task"

### Moving Tasks
1. Click and drag a task card
2. Drag to desired status column
3. Release to drop
4. Task status updates automatically

### Managing Tasks
- **View**: Click on a task to see details
- **Update**: Double-click a task to edit
- **Delete**: Click the "✕" button on task card
- **Filter**: Use sidebar navigation

### Team Management
- View all team members
- Check progress percentages
- See team performance metrics
- Track task assignments

---

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### Issue: Cannot connect to database
**Solution:**
- Verify PostgreSQL is running
- Check database credentials in .env
- Ensure database exists: `psql -l`

### Issue: CORS errors
**Solution:**
- Ensure backend is running
- Check CORS_ORIGIN in backend .env
- Verify frontend proxy settings

### Issue: Port already in use
**Solution:**
- Kill process: `lsof -i :5000` then `kill -9 <PID>`
- Or change port in .env file

### Issue: Module not found
**Solution:**
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Clear cache: `npm cache clean --force`

---

## 📊 Database Schema

### Tables

**team_members**
- id (Primary Key)
- name (VARCHAR)
- email (VARCHAR, Unique)
- role (VARCHAR)
- color (VARCHAR)
- progress (INTEGER)
- created_at, updated_at (TIMESTAMP)

**tasks**
- id (Primary Key)
- title (VARCHAR)
- description (TEXT)
- status (VARCHAR) - draft, in_progress, editing, done
- priority (VARCHAR) - Low, Medium, High
- assignee_id (Foreign Key to team_members)
- created_at, updated_at (TIMESTAMP)

**activity_logs**
- id (Primary Key)
- task_id (Foreign Key)
- user_id (Foreign Key)
- action (VARCHAR)
- description (TEXT)
- created_at (TIMESTAMP)

**comments**
- id (Primary Key)
- task_id (Foreign Key)
- author_id (Foreign Key)
- content (TEXT)
- created_at, updated_at (TIMESTAMP)

---

## 🚀 Deployment

### Deploy to Heroku (Backend)

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set DB_USER=<username> DB_PASSWORD=<password>

# Deploy
git push heroku main
```

### Deploy to Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Areas for Contribution
- Add authentication (JWT)
- Implement real-time updates (WebSockets)
- Add file attachments
- Implement task comments
- Add task filtering and search
- Create mobile app
- Add dark mode
- Implement notifications

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the setup guide
3. Check API documentation
4. Open an issue on GitHub

---

## 🎓 Learning Resources

### Frontend (React)
- [React Documentation](https://react.dev)
- [MDN Web Docs](https://developer.mozilla.org)
- [CSS-Tricks](https://css-tricks.com)

### Backend (Node.js)
- [Node.js Documentation](https://nodejs.org)
- [Express.js Guide](https://expressjs.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

---

## 🎯 Roadmap

### v1.1
- [ ] User authentication
- [ ] Task comments
- [ ] File attachments
- [ ] Email notifications

### v1.2
- [ ] Real-time collaboration (WebSockets)
- [ ] Dark mode
- [ ] Advanced filtering
- [ ] Export to PDF

### v2.0
- [ ] Mobile app (React Native)
- [ ] Calendar view
- [ ] Gantt chart
- [ ] Team scheduling

---

## 💡 Tips & Best Practices

1. **Performance**
   - Use React DevTools to find slow renders
   - Optimize database queries
   - Use indexes for large tables

2. **Security**
   - Always validate user input
   - Use HTTPS in production
   - Never commit .env files
   - Implement rate limiting

3. **Maintenance**
   - Regular database backups
   - Monitor server logs
   - Keep dependencies updated
   - Document custom code

---

## 🎉 Conclusion

You now have a complete, production-ready task management application! Start using it, customize it, and deploy it to help your team collaborate effectively.

Happy coding! 🚀

---

**Created with ❤️ for team collaboration**
