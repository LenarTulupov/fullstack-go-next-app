import { ReactNode } from "react"

interface ITableHeader {
  children: ReactNode;
}

export function TableHeader({ children }: ITableHeader) {
  return (
    <thead>
      { children }
    </thead>
  )
}
