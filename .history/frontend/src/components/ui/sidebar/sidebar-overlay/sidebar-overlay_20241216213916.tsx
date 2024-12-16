import { ReactNode } from 'react';
import styles from './sidebar-overlay.module.scss';

interface ISidebarOverlay {
  children: ReactNode;
}

export default function SidebarOverlay({ children }: ISidebarOverlay) {
  return (
    <div className={styles.sidebar__overlay}>
        { children }
    </div>
  )
};
