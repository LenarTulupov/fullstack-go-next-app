'use client';

import { ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import useScrollLock from '@/hooks/useScrollLock';
import Overlay from '../overlay/overlay';
import ModalContent from './modal-content/modal-content';

interface IModal {
  children: ReactNode;
  isModalOpened: boolean;
}

export default function Modal({
  children,
  isModalOpened
}: IModal) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(isModalOpened);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (isModalOpened) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isModalOpened]);

  useScrollLock(isModalOpened);

  if (!portalTarget || !isVisible) {
    return null;
  }

  return createPortal(
    <div className={styles.modal}>
      <Overlay isOpened={isModalOpened}>
        <ModalContent 
              isOpened={isOpened}
              position={position}
        >
          {children}
        </ModalContent>
      </Overlay>
    </div>,
    portalTarget
  );
}
