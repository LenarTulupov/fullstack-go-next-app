'use client';

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import styles from './popup.module.scss';
import { ReactNode } from "react";

interface IModul {
  children: ReactNode;
  isPopupOpened: boolean;
  variant?: 'left' | 'top' | 'right' | 'bottom';
  nested?: boolean;
}

export default function Modal({
  children,
  isPopupOpened,
  variant = 'bottom',
  nested = false,
}: IPopup) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  if (!portalTarget) {
    return null; 
  }

  return createPortal(
    <div className={`
      ${!nested ? styles.overlay_nested : styles.overlay} 
      ${isPopupOpened ? styles.overlay_opened : ''}
    `}>
      <div className={`
        ${styles.popup}
        ${styles[variant]}
        ${isPopupOpened ? styles[`${variant}_opened`] : ''}
      `}>
        {children}
      </div>
    </div>,
    portalTarget
  );
}
