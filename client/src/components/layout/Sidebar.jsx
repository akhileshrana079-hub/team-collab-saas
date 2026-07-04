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

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen p-5">

      <h1 className="text-2xl font-bold mb-10">
        TeamLink
      </h1>

      <nav className="space-y-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/workspaces"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaUsers />
          Workspaces
        </Link>

        <Link
          to="/projects"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaFolder />
          Projects
        </Link>

        <Link
          to="/tasks"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaTasks />
          Tasks
        </Link>

      </nav>

      <button
        onClick={logout}
        className="mt-10 flex items-center gap-3 text-red-400"
      >
        <FaSignOutAlt />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;