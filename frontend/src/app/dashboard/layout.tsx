import DashboardLayoutClient from "@/layouts/dashboard-layout/dashboard-layout";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: {children: ReactNode}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>
}
