import { ReactNode } from 'react';
import styles from './sidebar-content.module.scss';

interface ISidebarContent {
  children: ReactNode;
  position?: 'left' | 'right';
}

export default function SidebarContent({ children, position = 'right' }: ISidebarContent) {
  const positionClass = {
    left: styles.sidebar__content_left
  }
  return (
    <div className={`${styles.sidebar__content} ${styles.sidebar__content_[position]}`}>
      {children}
    </div>
  )
};
