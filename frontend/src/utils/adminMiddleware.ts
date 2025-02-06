import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { URL } from "@/constants/url";

const fetchAdminDashboard = async () => {
  const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

  if (!token) {
      console.error("No token found");
      return;
  }

  try {
      const response = await fetch(`${URL}${API_ENDPOINTS.ADMIN_DASHBOARD}`, {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`,
          },
      });

      const data = await response.json();
      if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
      }

      console.log("Dashboard data:", data);
  } catch (err) {
      console.error("Error fetching dashboard:", err);
  }
};