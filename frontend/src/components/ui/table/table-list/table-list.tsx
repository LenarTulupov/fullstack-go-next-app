import { ReactNode } from "react"

interface ITableList {
  children: ReactNode;
}

export function TableList({ children }: ITableList) {
  return (
    <tr>
      { children }
    </tr>
  )
}
