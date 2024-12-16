import { div } from "framer-motion/client";
import { ReactNode } from "react"

interface IModalContent {
  children: ReactNode;
}

export default function ModalContent({ children }: IModalContent) {
  return (
    <div className={styles.modal__content}>
      {children}
    </div>
  )
};
