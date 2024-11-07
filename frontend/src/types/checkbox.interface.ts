import { ChangeEvent } from "react";

export interface ICheckbox {
  id: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}