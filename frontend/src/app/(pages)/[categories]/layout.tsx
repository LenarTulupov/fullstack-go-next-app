import CategoriesLayout from "@/layouts/categories-layout/categories-layout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <CategoriesLayout>{children}</CategoriesLayout>
};