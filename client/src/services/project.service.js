import api from "../api/axios";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getProjects = async (workspaceId) => {
  const response = await api.get(
    `/workspaces/${workspaceId}/projects`,
    authConfig()
  );

  return response.data;
};

export const createProject = async (workspaceId, data) => {
  const response = await api.post(
    `/workspaces/${workspaceId}/projects`,
    data,
    authConfig()
  );

  return response.data;
};

export const updateProject = async (projectId, data) => {
  const response = await api.patch(
    `/projects/${projectId}`,
    data,
    authConfig()
  );

  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await api.delete(
    `/projects/${projectId}`,
    authConfig()
  );

  return response.data;
};

export const getProject = async (projectId) => {
  const response = await api.get(
    `/projects/${projectId}`,
    authConfig()
  );

  return response.data;
};