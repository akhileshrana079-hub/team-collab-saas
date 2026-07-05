import {
  FaHome,
  FaUsers,
  FaFolder,
  FaTasks,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const workspaceId = localStorage.getItem("workspaceId");
  const projectId = localStorage.getItem("projectId");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("workspaceId");
    localStorage.removeItem("projectId");
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          Team Collaboration
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/workspaces"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <FaUsers />
          Workspaces
        </Link>

        {workspaceId && (
          <Link
            to={`/workspaces/${workspaceId}/projects`}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
          >
            <FaFolder />
            Projects
          </Link>
        )}

        {projectId && (
          <Link
            to={`/projects/${projectId}/tasks`}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
          >
            <FaTasks />
            Tasks
          </Link>
        )}

      </nav>

      <div className="p-4 border-t border-slate-700">

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800 text-red-400"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;