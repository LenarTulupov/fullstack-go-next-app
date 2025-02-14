import { ReactNode } from "react"
import styles from './table-list.module.scss';
import DeleteIcon from "../../delete-icon/delete-icon";

interface ITableList {
  children: ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered?: boolean;
}

export function TableList({ children, onMouseEnter, onMouseLeave, isHovered }: ITableList) {
  return (
    <tr 
      className={styles["table-list"]} 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}
    >
      { children }
      {isHovered 
        ? (
          <button className="bg-gray-500 border absolute top-1/2 right-0">
            <DeleteIcon/>
          </button>
          ) 
        : null
      }
    </tr>
  )
}
