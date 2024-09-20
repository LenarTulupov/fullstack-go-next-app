import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { ReactNode } from "react"

interface IPagesLayout {
  children: ReactNode;
}

export default function PagesLayout({ children }: IPagesLayout) {
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  )
};
