import { ReactNode } from 'react';
import styles from './overlay.module.scss';

interface IOverlay {
  children: ReactNode
}

export default function Overlay({ children }: IOverlay) {
  return (
    <div className={styles.overlay}>
      {children}
    </div>
  )
};
