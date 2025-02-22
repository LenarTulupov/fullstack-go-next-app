'use client';

import { ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './sidebar.module.scss';
import useScrollLock from '@/hooks/useScrollLock';
import CloseButton from '../close-button/close-button';
import SidebarOverlay from './sidebar-overlay/sidebar-overlay';
import SidebarContent from './sidebar-content/sidebar-content';

interface ISidebar {
  children: ReactNode;
  isCartSidebarOpened: boolean;
  variant?: 'left' | 'right';
  onClick?: () => void;
  header?: boolean;
}

export default function Sidebar({
  children,
  isCartSidebarOpened
}: ISidebar) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setPortalTarget(document.body); 
  }, []);

  useScrollLock(isCartSidebarOpened);

  if (!portalTarget) {
    return null; 
  }

  return createPortal(
    <div className={styles.sidebar}>
        <SidebarContent>
          { children }
        </SidebarContent>
    </div>,
    portalTarget
  );
}
