import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import styles from './layout.module.scss';
import { ReactNode } from "react";
import CookieConsent from "@/components/cookie-consent/cookie-consent";

interface IPagesLayout {
  children: ReactNode;
}

export default function PagesLayout({ children }: IPagesLayout) {
  return (
    <>
      <Header />
      <div className={styles.layout__children}>
        {children}
      </div>
      <Footer />
      <CookieConsent/>
    </>
  )
};