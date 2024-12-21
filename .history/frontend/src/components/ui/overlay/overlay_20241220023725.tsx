import { ReactNode } from 'react';
import styles from './overlay.module.scss';

interface IOverlay {
  children: ReactNode
  isOpened: boolean
}

export default function Overlay({ children, isOpened }: IOverlay) {
  return (
    <div className={`${styles.overlay} 
    ${isOpened ? styles.overlay_opened : styles.overlay_closed}`}>
      {children}
    </div>
  )
};
