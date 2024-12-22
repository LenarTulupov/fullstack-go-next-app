'use client';

import { ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useScrollLock from '@/hooks/useScrollLock';
import Overlay from '../overlay/overlay';
import ModalContent from './modal-content/modal-content';
import styles from './modal.module.scss';

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
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (isOpened) {
      setIsVisible(true); // Монтируем компонент
      setTimeout(() => setAnimate(true), 10); // Небольшая задержка для активации анимации
    } else {
      setAnimate(false); // Отключаем анимацию
      const timeout = setTimeout(() => setIsVisible(false), 300); // Ждём завершение анимации закрытия
      return () => clearTimeout(timeout);
    }
  }, [isOpened]);

  useScrollLock(isOpened);

  useScrollLock(isOpened);

  if (!portalTarget || !isVisible) {
    return null;
  }

  return createPortal(
    <div className={styles.modal}>
      <Overlay isOpened={isOpened}>
        <ModalContent
          isOpened={animate}
          position={position}
        >
            {children}
        </ModalContent>
      </Overlay>
    </div>,
    portalTarget
  );
}
