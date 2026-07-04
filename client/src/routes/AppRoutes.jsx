import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import Workspace from "../pages/Workspace/Workspace";
import Project from "../pages/Project/Project";
import Task from "../pages/Task/Task";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workspaces"
          element={
            <ProtectedRoute>
              <Workspace />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workspaces/:workspaceId/projects"
          element={
            <ProtectedRoute>
              <Project />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:projectId/tasks"
          element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;