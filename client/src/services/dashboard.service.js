import api from "../api/axios";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getDashboard = async () => {
  const response = await api.get(
    "/dashboard",
    authConfig()
  );

  return response.data;
};