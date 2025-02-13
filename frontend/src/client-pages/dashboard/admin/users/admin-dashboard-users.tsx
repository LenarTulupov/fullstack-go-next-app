"use client";

import { useEffect, useState } from "react";
import { URL } from "@/constants/url";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { IUser } from "@/types/user.interface";
import UsersTable from "@/components/users-table/users-table";

export default function AdminDashboardUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function getUsers() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${URL}${API_ENDPOINTS.USERS}`);
        if (!response.ok) {
          throw new Error("Fetching error users" + response.status);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }
    getUsers();
  }, []);

  console.log(users);
  return (
    <div className="px-[15px]">
      <UsersTable users={users} loading={loading} error={error} />
    </div>
  );
}
