import { ITextInput } from "@/types/text-input.interface";
import styles from './text-input.module.scss'

export default function TextInput({
  type,
  className,
  id,
  placeholder,
  value,
  onChange,
  name,
  required }: ITextInput) {
  return (
    <input
      id={id}
      type={type}
      onChange={onChange}
      name={name}
      value={value}
      className={`${styles['text-input']} ${className || ''}`}
      placeholder={placeholder}
      required={required}
    />
  )
};
