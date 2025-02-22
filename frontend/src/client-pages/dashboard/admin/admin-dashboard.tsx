"use client";

import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { URL } from "@/constants/url";
import { useRouter } from "next/navigation";
import { setRole } from "@/store/user/userSlice";
import { useDispatch } from "react-redux";

const getCookie = (name: string): string | null => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(`(^|;)\\s*${name}=([^;]+)`);
    return match ? decodeURIComponent(match[2]) : null;
  }
  return null;
}; 

export default function AdminDashboardRight() {
  const [dashboardData, setDashboardData] = useState<{ role: string} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("token");
  
      if (!token) {
        setError("No token found");
        router.push("/admin/sign-in");
        return;
      }
  
      try {
        const response = await fetch(`${URL}${API_ENDPOINTS.ADMIN_DASHBOARD}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          credentials: "include",
        });
  
        if (!response.ok) {
          if (response.status === 401) {
            document.cookie = "token=; path=/; max-age=0";
            setError("Session expired. Please sign in again.");
            router.push("/admin/sign-in");
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong");
        }
  
        const data = await response.json();
        setDashboardData(data);
        dispatch(setRole(data.role));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };
  
    fetchData();
  }, [router, dispatch]);
  

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!dashboardData) {
    return <div>Loading...</div>;
  } 

  return (
    <div>
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
    </div>
  );
}
