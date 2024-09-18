import { IoCloseOutline } from "react-icons/io5";
import styles from './close-button.module.scss'

interface ICloseButton {
  onClick: () => void;
}

export default function CloseButton({ onClick }: ICloseButton) {
  return (
    <button onClick={onClick} className={styles['close-button']}>
      <IoCloseOutline/>
    </button>
  )
};
