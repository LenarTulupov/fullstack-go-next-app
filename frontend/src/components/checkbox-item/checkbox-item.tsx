// import { ILabelText } from "@/types/label-text.interface";
// import { ICheckbox } from "@/types/checkbox.interface";
// import Checkbox from "../ui/checkbox/checkbox";
// import LabelText from "../ui/label-text/label-text";
import styles from './checkbox-item.module.scss'

// interface ICheckboxItem extends ICheckbox, ILabelText { }

export default function CheckboxItem(/* { id, htmlFor, label }: ICheckboxItem */) {
  return (
    <div className={styles['checkbox-item']}>
      CheckboxItem
      {/* <Checkbox id={id} />
      <LabelText htmlFor={htmlFor} label={label} /> */}
    </div>
  )
};
