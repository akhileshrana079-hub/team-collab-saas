import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="flex justify-between items-center p-6 bg-white shadow">

        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      <div className="p-8">

        <h2 className="text-4xl font-bold">
          Welcome 👋
        </h2>

      </div>

    </div>
  );
}

export default Dashboard;