import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import toast from "react-hot-toast";

import {
  getWorkspaces,
  createWorkspace,
  deleteWorkspace,
} from "../../services/workspace.service";

function Workspace() {
  const [workspaces, setWorkspaces] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const loadWorkspaces = async () => {
    try {
      const response = await getWorkspaces();

      console.log(response);

      setWorkspaces(response.data);
    } catch (error) {
      console.log(error);
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
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to create workspace"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWorkspace(id);

      toast.success("Workspace deleted");

      loadWorkspaces();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Delete failed"
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
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="text-2xl font-bold">
                {item.workspace.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {item.workspace.description || "No description"}
              </p>

              <p className="text-blue-600 mt-2">
                Role: {item.role}
              </p>

              <button
                onClick={() => handleDelete(item.workspace._id)}
                className="mt-5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default Workspace;