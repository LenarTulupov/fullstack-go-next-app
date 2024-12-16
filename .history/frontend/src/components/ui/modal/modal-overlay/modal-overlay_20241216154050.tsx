import { ReactNode } from "react"
import styles from './modal-overlay.module.scss';


interface IOverlay {
  children: ReactNode;
}

export default function ModalOverlay({ children }: IOverlay) {
  return (
    <div className={styles.overlay}>
      {children}
    </div>
  )
};
