'use client';

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import styles from './modal.module.scss';
import { ReactNode } from "react";

interface IModal {
  children: ReactNode;
}

export default function Modal({ children }: IModal) {
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
