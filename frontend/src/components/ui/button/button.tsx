import { IButton } from "@/types/button.interface";
import styles from './button.module.scss'

export default function Button({
  children,
  onClick,
  className,
  variant = 'black',
  size = 'md',
  disabled = false,
  weight = 'bold',
  radius = 'main',
  type="button",
  onTouchStart }: IButton) {
  return (
    <button
      onClick={onClick}
      className={`
        ${styles.button} 
        ${styles[variant]} 
        ${styles[weight]}
        ${styles[size]} 
        ${styles[radius]}
        ${className || ''}
      `}
      onTouchStart={onTouchStart}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
};
