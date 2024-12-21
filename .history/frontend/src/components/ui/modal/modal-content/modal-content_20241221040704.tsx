import { ReactNode } from "react"
import styles from './modal-content.module.scss';


interface IModalContent {
  children: ReactNode;
  position?: 'bottom' | 'right';
  isOpened: boolean;
}


export default function ModalContent({ 
  children,
  position = 'bottom',
  isOpened = false }: IModalContent) {
  return (
    <div className={`
      ${styles.modal__content} 
      ${styles[`modal__content-${position}`]}
      ${isOpened
        ? styles[`modal__content-${position}_opened`]
        : styles[`modal__content-${position}_closed`]
      }
    `}>
      {children}
    </div>
  )
};
