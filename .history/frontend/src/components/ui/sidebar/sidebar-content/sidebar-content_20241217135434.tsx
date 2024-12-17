import { ReactNode } from 'react';
import styles from './sidebar-content.module.scss';

interface ISidebarContent {
  children: ReactNode;
  className?: string;
}

export default function SidebarContent({ children, className }: ISidebarContent) {
  return (
    <div className={`${styles.sidebar__content} ${className || }`}>
      {children}
    </div>
  )
};
