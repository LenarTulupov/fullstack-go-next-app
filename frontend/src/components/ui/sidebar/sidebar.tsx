import { ReactNode } from 'react';
import styles from './sidebar.module.scss';
import { createPortal } from 'react-dom';

interface ISidebar {
  children: ReactNode;
  isCartSidebarOpened: boolean;
}

export default function Sidebar({ children, isCartSidebarOpened }: ISidebar) {
  return createPortal(
    <div className={`${styles.overlay} ${isCartSidebarOpened ? styles.overlay_opened : ''}`}>
      <div className={`${styles.sidebar} ${isCartSidebarOpened ? styles.sidebar_opened : ''}`}>
        { children }
      </div>
    </div>,
    document.body
  )
};
