import { ReactNode } from "react";

interface IModalState {
  isOpen: boolean;
  content: ReactNode | null;
}

const initialState: IModalState = {
  isOpen: false,
  
}

