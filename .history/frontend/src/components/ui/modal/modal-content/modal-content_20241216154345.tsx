import { ReactNode } from "react"

interface IModalContent {
  children: ReactNode;
}

export default function ModalContent({ children }: IModalContent) {
  return { children }
};
