import { ICheckbox } from "@/types/checkbox.interface";

export default function Checkbox({ id }: ICheckbox ) {
  return (
    <input type="checkbox" id={id}/>
  )
};
