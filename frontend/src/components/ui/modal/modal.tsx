'use client';

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { ReactNode } from "react";
import ModalContent from "./modal-content/modal-content";
import styles from './modal.module.scss';
import Overlay from "../overlay/overlay";

interface IModal {
  children: ReactNode;
  isModalOpened: boolean;
}

export default function Modal({ children, isModalOpened }: IModal) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <div className={`
      ${styles.modal} 
      ${isModalOpened ? styles.modal_opened : styles.modal_closed}
      `}
    >
      <Overlay>
        <ModalContent>
          {children}
        </ModalContent>
      </Overlay>
    </div>,
    portalTarget
  );
}
