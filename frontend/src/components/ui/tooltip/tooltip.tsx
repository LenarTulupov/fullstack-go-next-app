import { ReactNode, useState } from 'react'
import styles from './tooltip.module.scss'

interface ITooltip {
  children: ReactNode;
  position: 'top' | 'right' | 'left' | 'bottom';
  content: string;
  className?: string;
}

export default function Tooltip({ 
  children, 
  position, 
  content, 
  className }: ITooltip) {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  return (
    <div
      className={`${styles.tooltip} ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible &&
        <div className={`${styles.tooltip__text} ${styles[position]}`}>
          {content}
        </div>
      }

    </div>
  )
};
