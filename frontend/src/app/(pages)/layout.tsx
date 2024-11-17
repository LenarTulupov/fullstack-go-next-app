'use client'

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Loader from "@/components/ui/loader/loader";
import { ReactNode, useEffect, useState } from "react"
import styles from './layout.module.scss';
import Sidebar from "@/components/ui/sidebar/sidebar";
import CartContent from "@/components/cart-content/cart-content";
import useCart from "@/hooks/useCart";

interface IPagesLayout {
  children: ReactNode;
}

export default function PagesLayout({ children }: IPagesLayout) {
  const [isLoading, setIsLoading] = useState(true);
  const { isCartSidebarOpened } = useCart();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Sidebar isCartSidebarOpened={isCartSidebarOpened}>
            <CartContent />
          </Sidebar>
          <Header />
          <div className={styles.layout__children}>
            {children}
          </div>
          <Footer />
        </>
      )}
    </div>
  )
};
