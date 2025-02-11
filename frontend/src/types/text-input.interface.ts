import { ChangeEvent } from "react";

export interface ITextInput {
  type: 'text' | 'email' | 'password' | 'tel';
  id: string;
  placeholder: string;
  className?: string;
  required: boolean;
  value?: string;
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}