"use client"

import CookieConsent from "@/components/cookie-consent/cookie-consent";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { ReactNode, useEffect } from "react";
import { setIsCookieModalOpened } from "@/store/cookie-modal/cookie-modal-slice";
import styles from "./pages-layout.module.scss";

export default function PagesLayoutClient({ children }: { children: ReactNode }) {
  const isCookieModalOpened = useSelector(
    (state: RootState) => state.cookieModalState.isCookieModalOpened
  );

  const dispatch = useDispatch();

  const handleCloseCookie = () => {
    dispatch(setIsCookieModalOpened(false));
  }

  useEffect(() => {
    const timeout = setTimeout(() => dispatch(setIsCookieModalOpened(true)), 5000)

    return () => clearTimeout(timeout);
  }, [dispatch]);
  return (
    <>
      <Header />
      <div className={styles.layout__children}>{children}</div>
      <Footer />
      {isCookieModalOpened && <CookieConsent onClick={handleCloseCookie} />}
    </>
  );
}
