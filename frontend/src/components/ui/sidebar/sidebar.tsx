import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './sidebar.module.scss';
import useScrollLock from '@/hooks/useScrollLock';
import CloseButton from '../close-button/close-button';

interface ISidebar {
  children: ReactNode;
  isCartSidebarOpened: boolean;
  variant?: 'left' | 'right';
  handleHamburgerClick?: () => void;
  header?: boolean;
}

export default function Sidebar({
  children,
  isCartSidebarOpened,
  variant = 'right',
  handleHamburgerClick,
  header = false }: ISidebar) {
  useScrollLock(isCartSidebarOpened);
  return createPortal(
    <div className={`
      ${styles.overlay} 
      ${isCartSidebarOpened ? styles.overlay_opened : ''}
      `}>
      <div className={`
        ${styles.sidebar} 
        ${isCartSidebarOpened ? styles[`${variant}_opened`] : styles[variant]}
      `}>
        {header ?
          <div className={`${styles.sidebar__header} ${styles[`sidebar__header_${variant}`]}`}>
            <CloseButton onClick={handleHamburgerClick} />
          </div>
          : null}
        <div className={styles.sidebar__children}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
};
