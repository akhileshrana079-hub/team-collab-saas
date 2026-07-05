import api from "../api/axios";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getMembers = async (workspaceId) => {
  const response = await api.get(
    `/workspaces/${workspaceId}/members`,
    authConfig()
  );

  return response.data;
};

export const addMember = async (workspaceId, data) => {
  const response = await api.post(
    `/workspaces/${workspaceId}/members`,
    data,
    authConfig()
  );

  return response.data;
};

export const updateMemberRole = async (memberId, role) => {
  const response = await api.patch(
    `/members/${memberId}/role`,
    { role },
    authConfig()
  );

  return response.data;
};

export const removeMember = async (memberId) => {
  const response = await api.delete(
    `/members/${memberId}`,
    authConfig()
  );

  return response.data;
};