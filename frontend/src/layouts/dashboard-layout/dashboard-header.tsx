"use client";

import Button from "@/components/ui/button/button";
import { RootState } from "@/store/store";
import { setRole } from "@/store/user/userSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardHeader() {
  const role = useSelector((state: RootState) => state.userState.role);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    if (typeof document !== "undefined") {
      document.cookie = "token=; path=/; max-age=0";
    }

    dispatch(setRole(null));

    router.push("/admin/sign-in");
  };
  return (
    <header>
      <div>{role}</div>
      <Button onClick={handleLogout}>Log Out</Button>
    </header>
  );
}
