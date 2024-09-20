import { ReactNode } from "react"
import styles from './title.module.scss'

interface ITitle {
  children: ReactNode;
  size?: 'sm',
  className?: string;
  weight?: 'regular' | 'bold';
}

export default function Title({ children, size = 'sm', className, weight = 'regular'}: ITitle) {
  return (
    <div className={`${styles.title} ${styles[size]} ${styles[weight]} ${className || ''}`}>
        { children }
    </div>
  )
};
