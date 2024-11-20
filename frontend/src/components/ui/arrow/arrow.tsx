import { IoIosArrowDown } from "react-icons/io";
import styles from './arrow.module.scss';

interface IArrow {
  position?: 'up' | 'down' | 'left' | 'right';
  size?: 'normal' | 'large';
  carousel?: boolean;
  className?: string;
}

export default function Arrow({ 
  position = 'up', 
  size = 'normal', 
  carousel = false, 
  className }: IArrow) {
  return <IoIosArrowDown 
    className={`
      ${styles.arrow} 
      ${styles[position]} 
      ${styles[size]}
      ${carousel ? styles.carousel : ''}
      ${className || ''}
    `}
  />
};
