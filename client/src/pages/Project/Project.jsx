import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import toast from "react-hot-toast";

import {
  getProjects,
  createProject,
  deleteProject,
} from "../../services/project.service";

function Project() {
  const workspaceId = prompt("Enter Workspace ID");

  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const loadProjects = async () => {
    try {
      const response = await getProjects(workspaceId);

      setProjects(response.data);
    } catch (error) {
      toast.error("Failed to load projects");
    }
  };

  useEffect(() => {
    if (workspaceId) {
      loadProjects();
    }
  }, []);

  const handleCreate = async () => {
    try {
      await createProject(workspaceId, {
        name,
        description,
      });

      toast.success("Project Created");

      setName("");
      setDescription("");

      loadProjects();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);

      toast.success("Project Deleted");

      loadProjects();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-8">

        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <div className="flex gap-3">

          <input
            placeholder="Project Name"
            className="border p-3 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Description"
            className="border p-3 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-5 rounded-lg"
          >
            Create
          </button>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {projects.map((project) => (

          <div
            key={project._id}
            className="bg-white shadow rounded-xl p-5"
          >

            <h2 className="text-xl font-bold">
              {project.name}
            </h2>

            <p className="mt-2">
              {project.description}
            </p>

            <p className="text-blue-600 mt-3">
              {project.status}
            </p>

            <button
              onClick={() => handleDelete(project._id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-5"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}

export default Project;