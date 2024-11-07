import { ChangeEvent } from 'react';
import styles from './radio.module.scss';

interface IRadio {
  id: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

export default function Radio({ id, className, onChange, checked }: IRadio ) {
  return (
    <input 
      type="radio" 
      id={id} 
      className={`${styles.radio} ${className || ''}`} 
      onChange={onChange}
      checked={checked}
    />
  )
};
