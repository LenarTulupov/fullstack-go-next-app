"use client";

import UsersTable from "@/components/users-table/users-table";
import { AppDispatch, RootState } from "@/store/store";
import { fetchUsers } from "@/store/users/users-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminDashboardUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch])
  return (
    <div className="px-[15px]">
      <UsersTable data={{ users, loading, error }} />
    </div>
  );
}
