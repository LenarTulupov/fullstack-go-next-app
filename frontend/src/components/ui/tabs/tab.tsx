import { ReactNode } from 'react';
import styles from './tab.module.scss';

interface ITab {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

export default function Tab({ children, className, onClick }: ITab) {
  return (
    <button className={`${styles.tab} ${className || ''}`} onClick={onClick}>
        { children }
    </button>
  )
};
