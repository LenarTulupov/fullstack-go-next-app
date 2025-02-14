import { ReactNode } from "react";

interface ITableBodyItem {
  children: ReactNode;
}

export function TableBodyItem({ children }: ITableBodyItem) {
  return (
    <td>
      { children }
    </td>
  )
}
