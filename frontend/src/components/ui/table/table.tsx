import { ReactNode } from "react"

interface ITable {
  children: ReactNode;
}

export function Table({ children }: ITable) {
  return (
    <table className="w-full border">
      { children }
    </table>
  )
}
