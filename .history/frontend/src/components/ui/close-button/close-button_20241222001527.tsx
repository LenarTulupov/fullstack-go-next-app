import { IoCloseOutline } from "react-icons/io5";
import styles from './close-button.module.scss'

interface ICloseButton {
  onClose?: () => void;
  className?: string;
}

export default function CloseButton({ onClose, className }: ICloseButton) {
  return (
    <button onClick={onClose} className={`${styles['close-button']}`}>
      <IoCloseOutline/>
    </button>
  )
};
