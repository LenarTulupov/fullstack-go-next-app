'use client';

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import styles from './modal.module.scss';
import { ReactNode } from "react";
import { div } from "framer-motion/client";

interface IModal {
  children: ReactNode;
  isPopupOpened: boolean;
  variant?: 'left' | 'top' | 'right' | 'bottom';
  nested?: boolean;
}

export default function Modal({
  children,
}: IModal) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {children}
      </div>
    </div>,
    portalTarget
  );
}
