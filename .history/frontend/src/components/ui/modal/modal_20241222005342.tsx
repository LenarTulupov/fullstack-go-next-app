'use client';

import { ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import useScrollLock from '@/hooks/useScrollLock';
import Overlay from '../overlay/overlay';
import ModalContent from './modal-content/modal-content';
import CloseButton from '../close-button/close-button';

interface IModal {
  children: ReactNode;
  isOpened: boolean;
  position?: 'bottom' | 'right'
}

export default function Modal({
  children,
  isOpened,
  position = 'bottom' }: IModal) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(isOpened);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (isOpened) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpened]);

  useScrollLock(isOpened);

  if (!portalTarget || !isVisible) {
    return null;
  }

  return createPortal(
    <div className={styles.modal}>
      <Overlay isOpened={isOpened}>
        <ModalContent
          isOpened={isOpened}
          position={position}
        >
          <div className={styles.children}>
            {children}
            <CloseButton/>
          </div>
        </ModalContent>
      </Overlay>
    </div>,
    portalTarget
  );
}
