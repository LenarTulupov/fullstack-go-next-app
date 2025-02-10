import Button from "@/components/ui/button/button";
import { ReactNode } from "react";
import DashboardHeader from "./dashboard-header";

interface IDashboardLayout {
  children: ReactNode;
}

export default function DashboardLayoutClient({ children }: IDashboardLayout) {
  return (
    <div className="flex">
      <aside className="flex flex-col w-[15%]">
        <Button>Dashboard</Button>
        <Button>Orders</Button>
        <Button>Products</Button>
        <Button>Posts</Button>
        <Button>Kanban</Button>
        <Button>Sign Out</Button>
      </aside>
      <div className="flex flex-col w-full">
        <DashboardHeader/>
        {children}
      </div>
    </div>
  );
}
