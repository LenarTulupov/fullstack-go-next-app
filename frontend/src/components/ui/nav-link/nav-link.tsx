import Link from "next/link";
import styles from './nav-link.module.scss';
import { ReactNode } from "react";

interface INavLink {
  children: ReactNode;
  href: string;
  className?: string;
}

export default function NavLink({ children, href, className }: INavLink) {
  return (
    <Link href={href} className={`${styles['nav-link']} ${className || ''}`}>
        { children }
    </Link>
  )
};
