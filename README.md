# 🚀 Team Collaboration SaaS

A full-stack Team Collaboration SaaS backend inspired by tools like Slack, Trello, and Jira. It provides secure workspace management, project tracking, task management, and role-based access control through a RESTful API.

---

## 🌐 Live Demo

- **Live API:** https://team-collab-saas.onrender.com
- **Swagger Documentation:** https://team-collab-saas.onrender.com/api-docs

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Get Current User

### 🏢 Workspace Management
- Create Workspace
- Get All Workspaces
- Get Workspace
- Update Workspace
- Delete Workspace

### 👥 Member Management
- Add Members
- Remove Members
- Update Member Roles
- Role-Based Access Control (RBAC)

### 📁 Project Management
- Create Project
- Get All Projects
- Get Project
- Update Project
- Delete Project

### ✅ Task Management
- Create Task
- Get All Tasks
- Get Task
- Update Task
- Delete Task
- Assign Task
- Update Task Status
- Pagination
- Search
- Filtering
- Sorting

### 📖 API Documentation
- Interactive Swagger UI

### 🐳 Docker Support
- Dockerized backend
- Docker Compose configuration

---

# 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| Node.js | Runtime |
| Express.js | Backend Framework |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Swagger | API Documentation |
| Docker | Containerization |
| Render | Deployment |

---

# 📂 Project Structure

```text
src
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── utils
├── app.js
└── server.js
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/akhileshrana079-hub/team-collab-saas.git

cd team-collab-saas
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file.

```env
PORT=3000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET
```

---

## Run Development Server

```bash
npm run dev
```

---

## Run Production

```bash
npm start
```

---

# 🐳 Docker

Build Image

```bash
docker compose build
```

Run Containers

```bash
docker compose up
```

---

# 📖 API Endpoints

## Authentication

| Method | Endpoint |
|--------|----------|
| POST | /api/v1/auth/register |
| POST | /api/v1/auth/login |
| GET | /api/v1/auth/me |
| POST | /api/v1/auth/logout |

---

## Workspaces

| Method | Endpoint |
|--------|----------|
| POST | /api/v1/workspaces |
| GET | /api/v1/workspaces |
| GET | /api/v1/workspaces/:id |
| PATCH | /api/v1/workspaces/:id |
| DELETE | /api/v1/workspaces/:id |

---

## Members

| Method | Endpoint |
|--------|----------|
| POST | /api/v1/workspaces/:id/members |
| GET | /api/v1/workspaces/:id/members |
| PATCH | /api/v1/members/:memberId/role |
| DELETE | /api/v1/members/:memberId |

---

## Projects

| Method | Endpoint |
|--------|----------|
| POST | /api/v1/workspaces/:workspaceId/projects |
| GET | /api/v1/workspaces/:workspaceId/projects |
| GET | /api/v1/projects/:projectId |
| PATCH | /api/v1/projects/:projectId |
| DELETE | /api/v1/projects/:projectId |

---

## Tasks

| Method | Endpoint |
|--------|----------|
| POST | /api/v1/projects/:projectId/tasks |
| GET | /api/v1/projects/:projectId/tasks |
| GET | /api/v1/tasks/:taskId |
| PATCH | /api/v1/tasks/:taskId |
| DELETE | /api/v1/tasks/:taskId |
| PATCH | /api/v1/tasks/:taskId/assign |
| PATCH | /api/v1/tasks/:taskId/status |

---

# 🔐 Role-Based Access Control

Supported Roles:

- OWNER
- ADMIN
- MANAGER
- MEMBER

Permissions are enforced across workspaces, projects, and tasks.

---

# 🚀 Deployment

The application is deployed on Render.

**Live API**

https://team-collab-saas.onrender.com

**Swagger**

https://team-collab-saas.onrender.com/api-docs

---

# 🔮 Future Improvements

- File Uploads
- Notifications
- Activity Logs
- Kanban Drag & Drop
- React Frontend
- Email Invitations
- Real-time Updates with Socket.IO

---
