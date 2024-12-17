import { ReactNode } from 'react';
import styles from './sidebar-content.module.scss';

interface ISidebarContent {
  children: ReactNode;
  position?: 'left' | 'right';
}

export default function SidebarContent({ children, position = 'right' }: ISidebarContent) {
  return (
    <div className={`${styles.sidebar__content} ${styles.sidebar__content}`}>
      {children}
    </div>
  )
};
