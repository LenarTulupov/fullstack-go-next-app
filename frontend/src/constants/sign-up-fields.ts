import { IInputField } from "@/types/input-field";

export const signUpFields: IInputField[] = [
  {
    labelProps: { htmlFor: 'name', label: 'Name' },
    textInputProps: { id: 'name', name: "name", placeholder: 'Name', type: 'text', required: true }
  },
  {
    labelProps: { htmlFor: 'email', label: 'Email' },
    textInputProps: { id: 'email', name: "email", placeholder: 'Email', type: 'email', required: true }
  },
  {
    labelProps: { htmlFor: 'password', label: 'Password' },
    textInputProps: { id: 'password', name: "password", placeholder: 'Password', type: 'password', required: true }
  },
  {
    labelProps: { htmlFor: 'passwordConfirm', label: 'Confirm Password' },
    textInputProps: { id: 'passwordConfirm', name: "passwordConfirm", placeholder: 'Confirm Password', type: 'password', required: true }
  }
];