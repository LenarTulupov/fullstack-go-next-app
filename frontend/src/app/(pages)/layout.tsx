'use client'

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Loader from "@/components/ui/loader/loader";
import { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom";
import styles from './layout.module.scss';


interface IPagesLayout {
  children: ReactNode;
}

export default function PagesLayout({ children }: IPagesLayout) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? createPortal(
        <Loader  className={styles.loader}/>,
        document.body
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </div>
  )
};
