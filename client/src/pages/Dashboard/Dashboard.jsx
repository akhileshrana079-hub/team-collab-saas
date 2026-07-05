import DashboardLayout from "../../layouts/DashboardLayout";
import {
  FaFolder,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
} from "react-icons/fa";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Welcome 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your team, projects and tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Workspaces
              </p>

              <h2 className="text-4xl font-bold mt-3">
                0
              </h2>
            </div>

            <FaFolder className="text-4xl text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Projects
              </p>

              <h2 className="text-4xl font-bold mt-3">
                0
              </h2>
            </div>

            <FaProjectDiagram className="text-4xl text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Tasks
              </p>

              <h2 className="text-4xl font-bold mt-3">
                0
              </h2>
            </div>

            <FaTasks className="text-4xl text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Members
              </p>

              <h2 className="text-4xl font-bold mt-3">
                0
              </h2>
            </div>

            <FaUsers className="text-4xl text-purple-600" />
          </div>
        </div>

      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-5">
            Recent Workspaces
          </h2>

          <p className="text-gray-500">
            No workspaces yet.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-5">
            Recent Tasks
          </h2>

          <p className="text-gray-500">
            No tasks yet.
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;