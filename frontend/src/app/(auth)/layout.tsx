import { ReactNode } from "react";
import styles from './layout.module.scss'
import '@/app/globals.scss'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles['auth-layout']}>
      {children}
    </div>
  )
};
