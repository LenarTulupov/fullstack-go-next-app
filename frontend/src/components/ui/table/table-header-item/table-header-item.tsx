import { IUser } from "@/types/user.interface";

interface ITableHeaderItem {
  item: IUser;
}

export function TableHeaderItem({ item }: ITableHeaderItem) {
  return (
    <th>
      {item.name}
    </th>
  )
}
