import { div } from "framer-motion/client";
import { ReactNode } from "react"

interface IOverlay {
  children: ReactNode;
}

export default function ModalOverlay({ children }: IOverlay) {
  return (
    <div>

    { children }
    </div>
  )
};
