# Task Management Application - Complete Setup Guide

## 📋 Overview

This is a full-stack task management application built with:
- **Frontend**: React.js with modern UI
- **Backend**: Node.js + Express API
- **Database**: PostgreSQL

---

## 🔧 Prerequisites

Make sure you have installed:

1. **Node.js** (v14+) - Download from https://nodejs.org/
2. **PostgreSQL** (v12+) - Download from https://www.postgresql.org/download/
3. **Git** - Download from https://git-scm.com/

Verify installations:
```bash
node --version
npm --version
psql --version
```

---

## 📂 Project Structure

```
task-management/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── TaskManagement.jsx
│   │   ├── TaskManagement.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── database.sql
└── README.md
```

---

## 🗄️ Step 1: Database Setup

### 1.1 Create PostgreSQL Database

Open PostgreSQL command line:
```bash
psql -U postgres
```

Create the database:
```sql
CREATE DATABASE task_management;
```

Connect to the database:
```sql
\c task_management
```

### 1.2 Initialize Database Schema

Run the SQL schema file:
```bash
psql -U postgres -d task_management -f database.sql
```

Or copy-paste the entire database.sql content into your PostgreSQL client.

### 1.3 Verify Database

Check tables were created:
```sql
\dt
```

You should see:
- team_members
- tasks
- activity_logs
- comments

---

## 🚀 Step 2: Backend Setup

### 2.1 Create Backend Folder

```bash
mkdir task-management-backend
cd task-management-backend
```

### 2.2 Initialize Node Project

```bash
npm init -y
```

### 2.3 Install Dependencies

```bash
npm install express cors pg dotenv
npm install --save-dev nodemon
```

Or copy the backend_package.json contents to your package.json

### 2.4 Create .env File

Create `.env` file in the backend folder:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
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

### 2.5 Add Server Files

Copy the following files to your backend folder:
- server.js (main server file)

### 2.6 Update package.json Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 2.7 Start Backend Server

```bash
npm run dev
```

You should see:
```
✅ Server running on http://localhost:5000
📊 API available at http://localhost:5000/api
```

---

## 💻 Step 3: Frontend Setup

### 3.1 Create React App

```bash
npx create-react-app task-management-frontend
cd task-management-frontend
```

Or if you prefer:
```bash
npm create vite@latest task-management-frontend -- --template react
cd task-management-frontend
npm install
```

### 3.2 Install Additional Dependencies

```bash
npm install axios
```

### 3.3 Add Frontend Files

Copy the following files to `src/`:
- TaskManagement.jsx
- TaskManagement.css
- Update App.js (see below)

### 3.4 Update App.js

Replace your `src/App.js` with:

```javascript
import TaskManagement from './TaskManagement';
import './App.css';

function App() {
  return (
    <div className="App">
      <TaskManagement />
    </div>
  );
}

export default App;
```

### 3.5 Update App.css

Add to `src/App.css`:
```css
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
}

#root {
  width: 100%;
  height: 100%;
}
```

### 3.6 Update package.json

Modify package.json to add proxy:
```json
{
  "proxy": "http://localhost:5000"
}
```

### 3.7 Start Frontend Server

```bash
npm start
```

The app should open at `http://localhost:3000`

---

## ✅ Testing the Application

### 1. Check Backend Health

Open browser and go to:
```
http://localhost:5000/api/health
```

You should see:
```json
{ "status": "Server is running" }
```

### 2. Check API Endpoints

Open browser and go to:
```
http://localhost:5000/api/team-members
```

You should see the sample team members in JSON format.

### 3. Test Frontend

The React app should load at `http://localhost:3000` showing:
- Team Performance section with progress bars
- Kanban board with tasks
- Profile card and metrics on the right

### 4. Try Creating a Task

Click "New Task" button and create a test task. It should:
- Save to the database
- Appear in the kanban board
- Show assignee details

---

## 📡 API Endpoints Reference

### Team Members
- `GET /api/team-members` - Get all team members
- `GET /api/team-members/:id` - Get specific member
- `POST /api/team-members` - Create new member
- `PUT /api/team-members/:id` - Update member
- `DELETE /api/team-members/:id` - Delete member

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get specific task
- `GET /api/tasks/status/:status` - Get tasks by status
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Statistics
- `GET /api/statistics` - Get dashboard stats
- `GET /api/health` - Health check

---

## 🐛 Troubleshooting

### Issue: Cannot connect to database

**Solution:**
1. Verify PostgreSQL is running:
   ```bash
   psql -U postgres
   ```
2. Check .env file has correct credentials
3. Ensure database exists:
   ```sql
   \l
   ```

### Issue: Port 5000 already in use

**Solution:**
Change PORT in .env:
```
PORT=5001
```

### Issue: CORS errors in browser

**Solution:**
Make sure backend is running and CORS is enabled in server.js

### Issue: React cannot fetch from backend

**Solution:**
1. Ensure backend server is running
2. Check proxy setting in frontend package.json
3. Check API URLs in TaskManagement.jsx use `http://localhost:5000/api`

---

## 🚀 Deployment (Optional)

### Deploy Backend to Heroku

```bash
cd backend
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

### Deploy Frontend to Vercel

```bash
cd frontend
npm run build
vercel
```

---

## 📚 Project Features

✅ Real-time task management
✅ Team member tracking
✅ Progress visualization
✅ Kanban board (Draft → In Progress → Editing → Done)
✅ Task filtering by status and priority
✅ Team performance metrics
✅ Responsive design
✅ RESTful API
✅ PostgreSQL database
✅ Complete CRUD operations

---

## 🤝 Contributing

Feel free to modify and improve:
1. Add more features (comments, attachments)
2. Improve UI/UX
3. Add authentication (JWT)
4. Add testing
5. Implement real-time updates (WebSockets)

---

## 📝 License

MIT License - feel free to use this project!

---

## 📞 Support

If you encounter issues:
1. Check all prerequisites are installed
2. Verify database is running
3. Check .env configuration
4. Review error logs in terminal
5. Ensure ports 3000 (frontend) and 5000 (backend) are not in use

---

## 🎯 Next Steps

After setup:
1. Explore the application UI
2. Create test tasks
3. Try dragging tasks between columns
4. Add more team members
5. Customize colors and roles
6. Deploy to production

Happy coding! 🚀
