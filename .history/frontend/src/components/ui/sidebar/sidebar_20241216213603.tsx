'use client';

import { ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './sidebar.module.scss';
import useScrollLock from '@/hooks/useScrollLock';
import CloseButton from '../close-button/close-button';
import SidebarOverlay from './sidebar-overlay/sidebar-overlay';

interface ISidebar {
  children: ReactNode;
  isCartSidebarOpened: boolean;
  variant?: 'left' | 'right';
  onClick?: () => void;
  header?: boolean;
}

export default function Sidebar({
  children,
  isCartSidebarOpened,
  variant = 'right',
  onClick,
  header = false
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
      <SidebarOverlay>
        
      </SidebarOverlay>

    </div>,
    portalTarget
  );
}
