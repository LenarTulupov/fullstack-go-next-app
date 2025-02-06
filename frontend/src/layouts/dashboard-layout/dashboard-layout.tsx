import Button from "@/components/ui/button/button";
import { ReactNode } from "react";

interface IDashboardLayout {
  children: ReactNode;
}

export default function DashboardLayoutClient({ children }: IDashboardLayout) {
  return (
    <div>
      <aside className="flex flex-col w-[15%]">
        <Button>Dashboard</Button>
        <Button>Orders</Button>
        <Button>Products</Button>
        <Button>Posts</Button>
        <Button>Kanban</Button>
        <Button>Sign Out</Button>
      </aside>
      {children}
    </div>
  );
}
