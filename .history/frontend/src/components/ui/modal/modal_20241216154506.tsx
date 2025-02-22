'use client';

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { ReactNode } from "react";
import styles from './modal.module.scss';
import ModalOverlay from "./modal-overlay/modal-overlay";
import { div } from "framer-motion/client";
import ModalContent from "./modal-content/modal-content";

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
    <div className={styles.modal}>
      <ModalOverlay>
        <ModalContent>
          {children}
        </ModalContent>
      </ModalOverlay>
    </div>,
    portalTarget
  );
}
