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
        ${styles.content} 
        ${styles[position]}
        ${isOpened
          ? styles[`${position}_opened`]
          : styles[`${position}_closed`]
        }
      `}>
      {children}
    </div>
  );
}
