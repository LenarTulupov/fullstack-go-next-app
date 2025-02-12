import { IInputField } from "@/types/input-field";

export const signInFields: IInputField[] = [
  {
    labelProps: { htmlFor: 'email', label: 'Email' },
    textInputProps: { id: 'email', name: "email" ,placeholder: 'Email', type: 'email', required: true }
  },
  {
    labelProps: { htmlFor: 'password', label: 'Password' },
    textInputProps: { id: 'password', name: "password", placeholder: 'Password', type: 'password', required: true }
  }
];