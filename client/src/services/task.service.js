import api from "../api/axios";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getTasks = async (projectId) => {
  const response = await api.get(
    `/projects/${projectId}/tasks`,
    authConfig()
  );

  return response.data;
};

export const createTask = async (projectId, data) => {
  const response = await api.post(
    `/projects/${projectId}/tasks`,
    data,
    authConfig()
  );

  return response.data;
};

export const updateTask = async (taskId, data) => {
  const response = await api.patch(
    `/tasks/${taskId}`,
    data,
    authConfig()
  );

  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(
    `/tasks/${taskId}`,
    authConfig()
  );

  return response.data;
};

export const updateTaskStatus = async (taskId, status) => {
  const response = await api.patch(
    `/tasks/${taskId}/status`,
    { status },
    authConfig()
  );

  return response.data;
};

export const assignTask = async (taskId, assignee) => {
  const response = await api.patch(
    `/tasks/${taskId}/assign`,
    { assignee },
    authConfig()
  );

  return response.data;
};