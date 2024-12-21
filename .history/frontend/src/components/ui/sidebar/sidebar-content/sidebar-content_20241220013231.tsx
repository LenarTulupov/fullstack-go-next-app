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
  isSidebarOpened = false,
}: ISidebarContent) {
 
const positionClass = {
  left: 'left',
  right: 'right'
}[position];
  return (
    <div
      className={`${styles.sidebar__content} ${
        isSidebarOpened
          ? styles[`sidebar__content-${positionClass}_opened`]
          : styles[`sidebar__content-${positionClass}`]
      }`}
    >
      {children}
    </div>
  );
}
