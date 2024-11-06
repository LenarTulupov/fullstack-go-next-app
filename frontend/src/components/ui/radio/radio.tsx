import styles from './radio.module.scss';

interface IRadio {
  id: string;
  className?: string;
}

export default function Radio({ id, className }: IRadio ) {
  return (
    <input 
      type="radio" 
      id={id} 
      className={`${styles.radio} ${className || ''}`} 
    />
  )
};
