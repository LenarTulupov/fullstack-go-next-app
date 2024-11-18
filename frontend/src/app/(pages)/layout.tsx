'use client'

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Loader from "@/components/ui/loader/loader";
import { ReactNode, useEffect, useState } from "react"
import styles from './layout.module.scss';
import Sidebar from "@/components/ui/sidebar/sidebar";
import CartContent from "@/components/cart-content/cart-content";
import useCart from "@/hooks/useCart";
import { usePathname } from "next/navigation";

interface IPagesLayout {
  children: ReactNode;
}

export default function PagesLayout({ children }: IPagesLayout) {
  const [isLoading, setIsLoading] = useState(true);
  const { isCartSidebarOpened } = useCart();
  const pathname = usePathname();

  const isCategoriesPage = 
    pathname.startsWith('/categories') || 
    pathname === '/favorite' || 
    pathname === '/product' ||
    pathname === '/search';

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
          <div className={isCategoriesPage
            ? styles.layout__children
            : styles['layout__children_no-margin']}
          >
            {children}
          </div>
          <Footer />
        </>
      )}
    </div>
  )
};
