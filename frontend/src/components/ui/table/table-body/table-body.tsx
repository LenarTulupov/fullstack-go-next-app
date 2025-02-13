import { ReactNode } from "react"

interface ITableBody {
  children: ReactNode;
}

export function TableBody({ children }: ITableBody) {
  return (
    <tbody>
      { children }
    </tbody>
  )
}
