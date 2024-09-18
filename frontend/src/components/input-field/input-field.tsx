import { IInputField } from '@/types/input-field'
import LabelText from '../ui/label-text/label-text'
import TextInput from '../ui/text-input/text-input'
import styles from './input-field.module.scss'

export default function InputField({labelProps, textInputProps}: IInputField) {
  return (
    <div className={styles['input-field']}>
        <LabelText { ...labelProps }/>
        <TextInput { ...textInputProps }/>
    </div>
  )
};
