import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './sidebar.module.scss';
import useScrollLock from '@/hooks/useScrollLock';

interface ISidebar {
  children: ReactNode;
  isCartSidebarOpened: boolean;
}

export default function Sidebar({ children, isCartSidebarOpened }: ISidebar) {
  useScrollLock(isCartSidebarOpened);
  return createPortal(
    <div className={`
      ${styles.overlay} 
      ${isCartSidebarOpened ? styles.overlay_opened : ''}
    `}>
      <div className={`
        ${styles.sidebar} 
        ${isCartSidebarOpened ? styles.sidebar_opened : ''}
      `}>
        {children}
      </div>
    </div>,
    document.body
  )
};
