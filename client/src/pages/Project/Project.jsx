import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import toast from "react-hot-toast";

import {
  getProjects,
  createProject,
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
        error.response?.data?.message || "Failed to create project"
      );
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId);

      toast.success("Project deleted");

      loadProjects();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Delete failed"
      );
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
            type="text"
            placeholder="Project Name"
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
            {projects.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          No projects found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.map((project) => (

            <div
              key={project._id}
              onClick={() =>
                navigate(`/projects/${project._id}/tasks`)
              }
              className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-xl transition"
            >

              <h2 className="text-2xl font-bold">
                {project.name}
              </h2>

              <p className="text-gray-600 mt-3">
                {project.description || "No description"}
              </p>

              <div className="flex justify-between items-center mt-5">

                <span className="text-blue-600 font-medium">
                  {project.status}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(project._id);
                  }}
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