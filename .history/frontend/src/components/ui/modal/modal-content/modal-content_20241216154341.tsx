import { ReactNode } from "react"

interface IModalContent {
  children: ReactNode;
}

export default function ModalContent({ children }) {
  return { children }
};
