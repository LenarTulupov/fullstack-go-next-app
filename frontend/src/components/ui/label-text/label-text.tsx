import styles from './label-text.module.scss';

import { ILabelText } from "@/types/label-text.interface";

export default function LabelText({ htmlFor, label, children, className  }: ILabelText ) {
  return (
    <label htmlFor={htmlFor} className={`${styles.label} ${className || ''}`}>
      {children || label}
    </label>
  )
};
