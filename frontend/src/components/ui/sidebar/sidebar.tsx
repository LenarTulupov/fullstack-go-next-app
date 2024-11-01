import { ReactNode } from 'react';
import styles from './sidebar.module.scss';
import { createPortal } from 'react-dom';

interface ISidebar {
  children: ReactNode;
}

export default function Sidebar({ children }: ISidebar) {
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.sidebar}>
        { children }
      </div>
    </div>,
    document.body
  )
};
