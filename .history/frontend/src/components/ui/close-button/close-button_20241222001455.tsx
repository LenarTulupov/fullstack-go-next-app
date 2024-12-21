import { IoCloseOutline } from "react-icons/io5";
import styles from './close-button.module.scss'

interface ICloseButton {
  onClose?: () => void;
  children: 
}

export default function CloseButton({ onClose, children }: ICloseButton) {
  return (
    <button onClick={onClose} className={styles['close-button']}>
      <IoCloseOutline/>
    </button>
  )
};
