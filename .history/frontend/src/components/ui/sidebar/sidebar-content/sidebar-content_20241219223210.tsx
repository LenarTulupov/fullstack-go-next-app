import { ReactNode } from 'react';
import styles from './sidebar-content.module.scss';

interface ISidebarContent {
  children: ReactNode;
  position?: 'left' | 'right';
  isSidebarOpened: boolean;
}

export default function SidebarContent({ 
  children, 
  position = 'right', 
  isSidebarOpened = false }: ISidebarContent) {
  const positionClass = {
    left: styles.sidebar__content_left,
    right: styles.sidebar__content_right
  }[position];
  return (
    <div className={`
      ${styles.sidebar__content} 
      ${positionClass}
      ${isSidebarOpened 
        ? styles.sidebar__content_opened 
        : styles.sidebar__content_closed
      }
    `}>
      {children}
    </div>
  )
};
