"use client";

import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { URL } from "@/constants/url";

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(`(^|;)\\s*${name}=([^;]+)`);
  return match ? decodeURIComponent(match[2]) : null;
};

export default function AdminDashboardRight() {
  const [dashboardData, setDashboardData] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("token");

      if (!token) {
        setError("No token found");
        return;
      }

      try {
        const response = await fetch(`${URL}${API_ENDPOINTS.ADMIN_DASHBOARD}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong");
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(dashboardData, null, 2)}</pre>
    </div>
  );
}
