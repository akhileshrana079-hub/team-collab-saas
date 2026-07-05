import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import toast from "react-hot-toast";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
} from "../../services/task.service";

function Task() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const loadTasks = async () => {
    try {
      const response = await getTasks(projectId);

      setTasks(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) {
      return toast.error("Task title is required");
    }

    try {
      await createTask(projectId, {
        title,
        description,
        priority,
      });

      toast.success("Task created");

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");

      loadTasks();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create task"
      );
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);

      toast.success("Task deleted");

      loadTasks();
    } catch (error) {
      console.error(error);

      toast.error("Delete failed");
    }
  };

  const handleStatus = async (taskId, status) => {
    try {
      await updateTaskStatus(taskId, status);

      toast.success("Status updated");

      loadTasks();
    } catch (error) {
      console.error(error);

      toast.error("Status update failed");
    }
  };

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Tasks
        </h1>

        <div className="flex gap-3">

          <input
            className="border rounded-lg p-3"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
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

          <select
            className="border rounded-lg p-3"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>

          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-6 rounded-lg"
          >
            Create
          </button>

        </div>

      </div>
            {tasks.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <h2 className="text-xl font-semibold">
            No Tasks Found
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first task.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tasks.map((task) => (

            <div
              key={task._id}
              className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition"
            >

              <h2 className="text-xl font-bold">
                {task.title}
              </h2>

              <p className="text-gray-600 mt-3">
                {task.description || "No description"}
              </p>

              <div className="mt-4 space-y-2">

                <p>
                  <span className="font-semibold">
                    Priority:
                  </span>{" "}
                  {task.priority}
                </p>

                <p>
                  <span className="font-semibold">
                    Status:
                  </span>{" "}
                  {task.status}
                </p>

                <p>
                  <span className="font-semibold">
                    Assignee:
                  </span>{" "}
                  {task.assignee?.name || "Unassigned"}
                </p>

              </div>

              <select
                className="w-full border rounded-lg p-2 mt-5"
                value={task.status}
                onChange={(e) =>
                  handleStatus(task._id, e.target.value)
                }
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="IN_REVIEW">IN REVIEW</option>
                <option value="DONE">DONE</option>
              </select>

              <button
                onClick={() => handleDelete(task._id)}
                className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              >
                Delete Task
              </button>

            </div>

          ))}

        </div>
      )}

    </DashboardLayout>
  );
}

export default Task;