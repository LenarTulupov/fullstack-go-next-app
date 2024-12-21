'use client';

import { ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './sidebar.module.scss';
import useScrollLock from '@/hooks/useScrollLock';
import SidebarContent from './sidebar-content/sidebar-content';
import Overlay from '../overlay/overlay';

interface ISidebar {
  children: ReactNode;
  isSidebarOpened: boolean;
  position?: 'left' | 'right';
}

export default function Sidebar({
  children,
  isSidebarOpened,
  position = 'right' 
}: ISidebar) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(isSidebarOpened);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (isSidebarOpened) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isSidebarOpened]);

  useScrollLock(isSidebarOpened);

  if (!portalTarget || !isVisible) {
    return null;
  }

  return createPortal(
    <div className={styles.sidebar}>
      <Overlay isOpen={isSidebarOpened} />
      <SidebarContent isSidebarOpened={isSidebarOpened} position={position}>
        {children}
      </SidebarContent>
    </div>,
    portalTarget
  );
}
