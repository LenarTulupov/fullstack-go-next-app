import { ReactNode } from "react"
import styles from './products-grid.module.scss'

interface IProductsGrid {
  children: ReactNode;
  className?: string;
}

export default function ProductsGrid({ children, className }: IProductsGrid) {
  return (
    <div className={`${styles['products-grid']} ${className || ''}`}>
        { children }
    </div>
  )
};
