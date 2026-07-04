import api from "../api/axios";

export const getWorkspaces = async () => {
  const response = await api.get("/workspaces", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const createWorkspace = async (data) => {
  const response = await api.post("/workspaces", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const updateWorkspace = async (id, data) => {
  const response = await api.patch(`/workspaces/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const deleteWorkspace = async (id) => {
  const response = await api.delete(`/workspaces/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};