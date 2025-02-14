import { ReactNode } from "react";

interface ITableHeaderItem {
  children: ReactNode;
}

export function TableHeaderItem({ children  }: ITableHeaderItem) {
  return (
    <th>
      { children } 
    </th>
  )
}
