import { ILabelText } from "@/types/label-text.interface";

export default function LabelText({ htmlFor, label, children  }: ILabelText ) {
  return (
    <label htmlFor={htmlFor}>
      {children || label}
    </label>
  )
};
