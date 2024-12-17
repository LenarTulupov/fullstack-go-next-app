import { ReactNode } from 'react';
import styles from './sidebar-content.module.scss';

interface ISidebarContent {
  children: ReactNode;
  position?
}

export default function SidebarContent({ children }: ISidebarContent) {
  return (
    <div className={styles.sidebar__content}>
      {children}
    </div>
  )
};
