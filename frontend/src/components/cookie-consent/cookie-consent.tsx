"use client"

import Link from "next/link";
import Button from "../ui/button/button";
import Title from "../ui/title/title";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsCookieModalOpened } from "@/store/cookie-modal/cookie-modal-slice";
import styles from "./cookie-consent.module.scss";

export default function CookieConsent({ onClick}) {
  return (
    <div className={styles["cookie-consent"]}>
      <div className={styles["cookie-consent__content"]}>
        <Title className={styles['cookie-consent__title']}>
          We use cookies to improve our services. Learn more in our <Link href="/cookie-policy" className={styles['cookie-consent__link']}>Cookie
          Policy</Link>.
        </Title>
        <div className={styles["cookie-consent__buttons"]}>
          <Button onClick={onClick}>Opt Out</Button>
          <Button>Accept</Button>
        </div>
      </div>
    </div>
  );
}
