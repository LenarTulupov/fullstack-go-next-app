'use client';

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { ReactNode } from "react";
import ModalOverlay from "./modal-overlay/modal-overlay";
import ModalContent from "./modal-content/modal-content";
import styles from './modal.module.scss';

interface IModal {
  children: ReactNode;
  isModalOpened: boolean;
}

export default function Modal({ children, isModalOpened }: IModal) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  console.log(isModalOpened)

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <div className={`
      ${styles.modal} 
      ${isModalOpened ? styles.modal_opened : styles.modal_opened}
      `}
    >
      <ModalOverlay>
        <ModalContent>
          {children}
        </ModalContent>
      </ModalOverlay>
    </div>,
    portalTarget
  );
}
