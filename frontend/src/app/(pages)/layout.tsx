import { ReactNode } from "react"

interface IPagesLayout {
  children: ReactNode;
}

export default function PagesLayout({ children }: IPagesLayout ) {
  return (
    <div>
        { children }
    </div>
  )
};
