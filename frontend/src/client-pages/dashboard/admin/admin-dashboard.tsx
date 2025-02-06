"use client"

import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { URL } from "@/constants/url";

export default function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('token='))
                ?.split('=')[1];

            if (!token) {
                setError("No token found");
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

                setDashboardData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!dashboardData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
        </div>
    );
}