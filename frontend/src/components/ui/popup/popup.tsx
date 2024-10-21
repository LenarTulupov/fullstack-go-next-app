import { createPortal } from "react-dom";
import styles from './popup.module.scss';
import { ReactNode } from "react";

interface IPopup {
  children: ReactNode;
  isPopupOpened: boolean;
  variant?: 'left' | 'top' | 'right' | 'bottom';
  nested?: boolean;
}

export default function Popup({
  children,
  isPopupOpened,
  variant = 'bottom',
  nested = false }: IPopup) {
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
    document.body
  )
};
