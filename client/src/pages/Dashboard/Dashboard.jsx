import DashboardLayout from "../../layouts/DashboardLayout";

function Dashboard() {
  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">
        Welcome 👋
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold">
            Workspaces
          </h2>

          <p className="text-4xl mt-4">
            0
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold">
            Projects
          </h2>

          <p className="text-4xl mt-4">
            0
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold">
            Tasks
          </h2>

          <p className="text-4xl mt-4">
            0
          </p>
        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;