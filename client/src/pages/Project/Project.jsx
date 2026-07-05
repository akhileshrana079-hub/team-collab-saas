import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import toast from "react-hot-toast";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/project.service";

function Project() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const loadProjects = async () => {
    try {
      const response = await getProjects(workspaceId);

      setProjects(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load projects");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) {
      return toast.error("Project name is required");
    }

    try {
      await createProject(workspaceId, {
        name,
        description,
      });

      toast.success("Project created");

      setName("");
      setDescription("");

      loadProjects();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create project"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);

      toast.success("Project deleted");

      loadProjects();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  const handleArchive = async (project) => {
    try {
      await updateProject(project._id, {
        status:
          project.status === "ACTIVE"
            ? "ARCHIVED"
            : "ACTIVE",
      });

      toast.success("Project updated");

      loadProjects();
    } catch (error) {
      console.error(error);

      toast.error("Update failed");
    }
  };

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <div className="flex gap-3">

          <input
            className="border rounded-lg p-3"
            placeholder="Project Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            className="border rounded-lg p-3"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-6 rounded-lg"
          >
            Create
          </button>

        </div>

      </div>
            {projects.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <h2 className="text-xl font-semibold">
            No Projects Found
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first project.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.map((project) => (

            <div
              key={project._id}
              className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition"
            >

              <h2 className="text-2xl font-bold">
                {project.name}
              </h2>

              <p className="text-gray-600 mt-3">
                {project.description || "No description"}
              </p>

              <div className="mt-4 flex items-center justify-between">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {project.status}
                </span>

              </div>

              <div className="mt-6 flex flex-wrap gap-2">

                <button
                  onClick={() =>
                    navigate(`/projects/${project._id}/tasks`)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Open Tasks
                </button>

                <button
                  onClick={() => handleArchive(project)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                >
                  {project.status === "ACTIVE"
                    ? "Archive"
                    : "Activate"}
                </button>

                <button
                  onClick={() => handleDelete(project._id)}
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

export default Project;