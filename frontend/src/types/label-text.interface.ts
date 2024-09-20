import { ReactNode } from "react";

export interface ILabelText {
  htmlFor: string;
  label?: string;
  children?: ReactNode;
}