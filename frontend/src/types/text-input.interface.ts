export interface ITextInput {
  type: 'text' | 'email' | 'password' | 'tel';
  id: string;
  placeholder: string;
  className?: string;
  required: boolean;
}