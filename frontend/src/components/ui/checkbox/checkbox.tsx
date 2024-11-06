import styles from './checkbox.module.scss';

import { ICheckbox } from "@/types/checkbox.interface";

export default function Checkbox({ id, className }: ICheckbox) {
  return (
    <input
      type="checkbox"
      id={id}
      className={`${styles.checkbox} ${className || ''}`}
    />
  )
};
