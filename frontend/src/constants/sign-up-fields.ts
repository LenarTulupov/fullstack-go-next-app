import { IInputField } from "@/types/input-field";

export const signUpFields: IInputField[] = [
  {
    labelProps: { htmlFor: 'username', label: 'Username' },
    textInputProps: { id: 'username', name: "username", placeholder: 'Username', type: 'text', required: true }
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