import Image from "next/image";
import Container from "../ui/container/container";
import styles from './footer.module.scss';
import { logo } from "@/constants/logo";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footer__wrapper}>
          <div className={styles['footer__logo']}>
            <Link href="/">
              <Image src={logo} alt="logo" width={100} height={30} />
            </Link>
            <div className={styles['footer__copyright-text']}>
              © 2022 Adilo. All rights reserved.
            </div>
          </div>
          <div className={styles.footer__menu}>
            <div className={`${styles['footer__grid-col-2']} ${styles['col-2']}`}>
              <div className={styles['footer__menu-header']}>PRODUCT</div>
              <ul className={styles['footer__menu-list']}>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Hosting & Collaboration</Link>
                </li>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Video Player</Link>
                </li>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Video Channels</Link>
                </li>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Video Recording</Link>
                </li>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Real-time Analytics</Link>
                </li>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Video Security</Link>
                </li>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Upcoming features & product pipeline</Link>
                </li>
              </ul>
            </div>
            <div className={styles['footer__grid-col-3']}>
              <div className={styles['footer__menu-header']}>RESOURCES</div>
              <ul className={styles['footer__menu-list']}>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Features</Link>
                </li>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Pricing</Link>
                </li>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Help Desk</Link>
                </li>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Onboarding Channel/Product Training</Link>
                </li>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Roadmap</Link>
                </li>
              </ul>
            </div>
            <div className={styles['footer__grid-col-4']}>
              <div className={styles['footer__menu-header']}>LEGAL</div>
              <ul className={styles['footer__menu-list']}>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Terms of Service</Link>
                </li>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Privacy Policy</Link>
                </li>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Cookie Policy & GDPR</Link>
                </li>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Refund Policy</Link>
                </li>
                <li className={styles['footer__menu__item']}>
                  <Link href="/">Disclaimer</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
};
