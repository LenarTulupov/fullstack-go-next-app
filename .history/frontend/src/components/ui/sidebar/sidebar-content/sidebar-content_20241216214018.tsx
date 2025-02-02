import { ReactNode } from 'react';
import styles from './sidebar-content.module.scss';

interface ISidebarContent {
  children: ReactNode;
}

export default function SidebarContent({ children }: ISidebarContent) {
  return (
    <div className={styles.sidebar__content}>
        SidebarContent
    </div>
  )
};
