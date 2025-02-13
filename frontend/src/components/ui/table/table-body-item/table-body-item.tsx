import { IUser } from "@/types/user.interface";

interface ITableBodyItem {
  item: IUser;
}

export function TableBodyItem({ item }: ITableBodyItem) {
  return (
    <td>
      { item.name }
    </td>
  )
}
