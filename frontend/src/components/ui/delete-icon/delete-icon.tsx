import { MdDeleteOutline } from "react-icons/md";

interface IDeleteIcon {
  className?: string;
}

export default function DeleteIcon({ className }: IDeleteIcon) {
  return <MdDeleteOutline className={className || ""}/>
}
