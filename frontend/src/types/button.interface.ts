import { ReactNode } from "react";

export interface IButton {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  variant?: 'black' | 'white';
  weight?: 'bold' | 'regular';
  size?: 'sm' | 'md';
  disabled?: boolean;
  radius?: 'main' | 'none';
  type?: 'button' | 'submit';
}