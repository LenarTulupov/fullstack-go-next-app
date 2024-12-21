import { ReactNode } from "react"
import styles from './modal-content.module.scss';


interface IModalContent {
  children: ReactNode;
  position?: 'left' | 'right';
  isOpened: boolean;
}


export default function ModalContent({ children,
  position = 'right',
  isOpened = false }: IModalContent) {
  return (
    <div className={styles.modal__content}>
      {children}
    </div>
  )
};
