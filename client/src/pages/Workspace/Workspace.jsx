import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import toast from "react-hot-toast";

import {
  getWorkspaces,
  createWorkspace,
  deleteWorkspace,
} from "../../services/workspace.service";

function Workspace() {
  const navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const loadWorkspaces = async () => {
    try {
      const response = await getWorkspaces();
      setWorkspaces(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load workspaces");
    }
  };

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) {
      return toast.error("Workspace name is required");
    }

    try {
      await createWorkspace({
        name,
        description,
      });

      toast.success("Workspace created");

      setName("");
      setDescription("");

      loadWorkspaces();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create workspace"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWorkspace(id);

      toast.success("Workspace deleted");

      loadWorkspaces();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Workspaces
        </h1>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Workspace Name"
            className="border rounded-lg p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            className="border rounded-lg p-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
          >
            Create
          </button>

        </div>

      </div>

      {workspaces.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          No workspaces found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {workspaces.map((item) => (

            <div
              key={item.workspace._id}
              className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition"
            >

              <h2 className="text-2xl font-bold">
                {item.workspace.name}
              </h2>

              <p className="text-gray-600 mt-3">
                {item.workspace.description || "No description"}
              </p>

              <p className="mt-4 text-blue-600 font-semibold">
                {item.role}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">

                <button
                  onClick={() => {
                    localStorage.setItem(
                      "workspaceId",
                      item.workspace._id
                    );

                    navigate(
                      `/workspaces/${item.workspace._id}/projects`
                    );
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Open Projects
                </button>

                <button
                  onClick={() => {
                    localStorage.setItem(
                      "workspaceId",
                      item.workspace._id
                    );

                    navigate(
                      `/workspaces/${item.workspace._id}/members`
                    );
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Members
                </button>

                <button
                  onClick={() =>
                    handleDelete(item.workspace._id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}
    </DashboardLayout>
  );
}

export default Workspace;