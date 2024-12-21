'use client';

import { ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './sidebar.module.scss';
import useScrollLock from '@/hooks/useScrollLock';
import SidebarContent from './sidebar-content/sidebar-content';
import Overlay from '../overlay/overlay';

interface ISidebar {
  children: ReactNode;
  isOpened: boolean;
  position?: 'left' | 'right';
}

export default function Sidebar({
  children,
  isOpened,
  position = 'right' }: ISidebar) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(isOpened);

  useEffect(() => {
    if (isOpened) {
      setIsVisible(true);
    }
  }, [isOpened]);

  useScrollLock(isOpened);

  const handleClose = () => {
    if (!isOpened) {
      setIsVisible(false); 
    }
  };

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);


  if (!portalTarget || !isVisible) {
    return null;
  }

  return createPortal(
    <div className={styles.sidebar}>
      {}
      <Overlay isOpened={isOpened}>
        <SidebarContent
          isOpened={isOpened}
          position={position}
          onAnimationEnd={handleClose}
        >
          {children}
        </SidebarContent>
      </Overlay>
    </div>,
    portalTarget
  );
}
