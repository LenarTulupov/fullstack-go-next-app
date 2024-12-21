import { ReactNode } from 'react';
import styles from './sidebar-content.module.scss';

interface ISidebarContent {
  children: ReactNode;
  position?: 'left' | 'right';
  isOpened: boolean;
}


export default function SidebarContent({
  children,
  position = 'right',
  isOpened = false }: ISidebarContent) {
  return (
    <div
      className={`
        ${styles.sidebar__content} 
        ${styles[position]}
        ${isOpened
          ? styles.[]
          : styles[`sidebar__content-${positionClass}_closed`]
        }
      `}>
      {children}
    </div>
  );
}
