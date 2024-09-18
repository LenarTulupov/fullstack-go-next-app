import { IButton } from "@/types/button.interface";
import styles from './button.module.scss'

export default function Button({
  children,
  onClick,
  className,
  variant = 'black',
  size = 'md',
  disabled = false }: IButton) {
  return (
    <button
      onClick={onClick}
      className={`
        ${styles.button} 
        ${styles[variant]} 
        ${styles[size]} 
        ${className || ''}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  )
};
