'use client';

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { ReactNode } from "react";
import styles from './modal.module.scss';
import ModalOverlay from "./modal-overlay/modal-overlay";
import { div } from "framer-motion/client";

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
          {children}
        </div>
      </ModalOverlay>
    </div>,
    portalTarget
  );
}
