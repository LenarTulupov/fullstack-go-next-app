import { ReactNode } from "react"
import styles from './container.module.scss'

interface IContainer {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: IContainer ) {
  return (
    <div className={`${styles.container} ${className || ''}`}>
        { children }
    </div>
  )
};
