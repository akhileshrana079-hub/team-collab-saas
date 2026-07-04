import api from "../api/axios";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getProjects = async (workspaceId) => {
  const response = await api.get(
    `/workspaces/${workspaceId}/projects`,
    authHeader()
  );

  return response.data;
};

export const createProject = async (workspaceId, data) => {
  const response = await api.post(
    `/workspaces/${workspaceId}/projects`,
    data,
    authHeader()
  );

  return response.data;
};

export const updateProject = async (projectId, data) => {
  const response = await api.patch(
    `/projects/${projectId}`,
    data,
    authHeader()
  );

  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await api.delete(
    `/projects/${projectId}`,
    authHeader()
  );

  return response.data;
};