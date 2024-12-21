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
  position = 'right' }: ISidebar) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useScrollLock(isSidebarOpened);

  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <div className={styles.sidebar}
    >
      <Overlay>
        <SidebarContent
          isSidebarOpened={isSidebarOpened}
          position={position}
        >
          {children}
        </SidebarContent>
      </Overlay>
    </div>,
    portalTarget
  );
}
