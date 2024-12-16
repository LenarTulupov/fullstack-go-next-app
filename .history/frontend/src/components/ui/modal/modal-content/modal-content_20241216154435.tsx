import { div } from "framer-motion/client";
import { ReactNode } from "react"

interface IModalContent {
  children: ReactNode;
}

export default function ModalContent({ children }: IModalContent) {
  return (
    <div>
      
    { children }
  )
};
