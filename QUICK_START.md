# 🚀 Quick Start Guide

Get your Task Management Application running in 15 minutes!

---

## ⏱️ 5 Steps to Launch

### Step 1: Setup Database (2 minutes)

Open PostgreSQL:
```bash
psql -U postgres
```

Create database:
```sql
CREATE DATABASE task_management;
\c task_management
```

Copy and paste entire `database.sql` file content here. Press Enter.

---

### Step 2: Start Backend (3 minutes)

Open **Terminal 1**:
```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` file:
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management
PORT=5000
```

Run backend:
```bash
npm run dev
```

✅ You should see:
```
✅ Server running on http://localhost:5000
📊 API available at http://localhost:5000/api
```

---

### Step 3: Start Frontend (3 minutes)

Open **Terminal 2**:
```bash
cd frontend
npm install
npm start
```

✅ Browser opens automatically at `http://localhost:3000`

---

### Step 4: Test the App (2 minutes)

1. Open http://localhost:3000
2. Click "New Task" button
3. Create a test task
4. Drag task between columns
5. ✅ Everything works!

---

### Step 5: Add More Features (5 minutes)

Optional: Replace `TaskManagement.jsx` with `TaskManagement_Advanced.jsx` for:
- Better error handling
- Loading states
- Drag & drop improvements
- Statistics card
- Better styling

Copy files:
```bash
cp TaskManagement_Advanced.jsx src/TaskManagement.jsx
cp TaskManagement_Advanced.css src/TaskManagement.css
```

---

## 📋 Key Shortcuts

### Create Task
- Click "New Task" or press `Ctrl+N` (if implemented)

### Move Task
- Drag task card to different column

### Delete Task
- Click "✕" on task card

### View Details
- Click on task (if detail view is implemented)

---

## 🎯 First Tasks to Try

1. **Create Task:**
   - Title: "Build Dashboard"
   - Status: Draft
   - Priority: High
   - Assign: Alice Johnson

2. **Move to In Progress:**
   - Drag "Build Dashboard" to "In Progress" column

3. **View Statistics:**
   - Check right sidebar for team stats

---

## 🔗 Important URLs

| Feature | URL |
|---------|-----|
| Frontend App | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| Team Members | http://localhost:5000/api/team-members |
| All Tasks | http://localhost:5000/api/tasks |
| Statistics | http://localhost:5000/api/statistics |
| Health Check | http://localhost:5000/api/health |

---

## 🐛 Common Issues & Fixes

### Issue: Port 5000 in use
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### Issue: npm modules missing
```bash
npm install
npm cache clean --force
rm -rf node_modules
npm install
```

### Issue: Database error
```sql
-- Check if database exists
\l

-- Check if tables exist
\dt

-- Reconnect
\c task_management
```

### Issue: CORS error
- Ensure backend is running on :5000
- Check .env CORS_ORIGIN setting
- Restart both servers

### Issue: Database connection error
- Verify PostgreSQL is running
- Check credentials in .env
- Ensure database name is correct

---

## 📊 Sample Data

Your database already includes:
- 4 Team Members (Alice, Bob, Carol, David)
- 8 Sample Tasks across all status columns
- Sample progress data

---

## 🎨 Customization

### Change Colors

Edit `.env` or database directly:
```sql
UPDATE team_members SET color = '#FF0000' WHERE name = 'Alice Johnson';
```

Available colors:
- #3B82F6 (Blue)
- #8B5CF6 (Purple)
- #EC4899 (Pink)
- #F59E0B (Amber)
- #10B981 (Green)

### Change Team Members

Add via API:
```bash
curl -X POST http://localhost:5000/api/team-members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Person",
    "email": "new@example.com",
    "role": "Manager",
    "color": "#3B82F6",
    "progress": 75
  }'
```

---

## 📈 Next Steps

After getting comfortable:

1. **Explore the UI** - Click around, try features
2. **Check the API** - Open DevTools, see API calls
3. **Read Documentation** - Review README.md
4. **Customize** - Change colors, add team members
5. **Deploy** - Put it online (see README.md)
6. **Add Features** - Implement authentication, comments, etc.

---

## 📚 File Reference

| File | Purpose |
|------|---------|
| `server.js` | Backend API server |
| `database.sql` | Database schema |
| `TaskManagement.jsx` | Main React component |
| `TaskManagement.css` | All styling |
| `api.js` | API utility functions |
| `package.json` | Dependencies |
| `.env` | Configuration |

---

## 💡 Pro Tips

✅ Use DevTools (F12) to inspect API calls  
✅ Check Console tab for errors  
✅ Use Network tab to monitor API requests  
✅ Refresh page if tasks don't appear  
✅ Check .env file if connection fails  
✅ Restart servers after config changes  

---

## 🆘 Still Stuck?

1. Check SETUP_GUIDE.md for detailed instructions
2. Review API_REFERENCE.md for API details
3. Check README.md for full documentation
4. Check server console for error messages
5. Check browser console (F12) for errors

---

## ✅ Checklist

Before declaring success, verify:

- [ ] PostgreSQL running
- [ ] Database created
- [ ] Backend started (http://localhost:5000/api/health works)
- [ ] Frontend started (http://localhost:3000 loads)
- [ ] Can see team members
- [ ] Can see sample tasks in kanban board
- [ ] Can create new task
- [ ] Can drag tasks between columns
- [ ] No errors in console

---

## 🎉 You're Ready!

Your Task Management Application is now running! Start using it to manage your team's projects.

**Questions?** Check the documentation files included in the project.

---

**Version:** 1.0.0  
**Created:** January 2024  
**Happy Coding!** 🚀
