import { ReactNode } from 'react'
import styles from './layout.module.scss'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      { children }
    </div>
  )
};
