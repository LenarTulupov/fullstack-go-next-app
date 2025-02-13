import { IUser } from "@/types/user.interface";
import { Table, TableBody, TableBodyItem, TableHeader, TableHeaderItem, TableList } from "../ui/table";

interface IUsersTable {
  users: IUser[];
  loading: boolean;
  error: string;
}


export default function UsersTable({ users, loading, error }: IUsersTable) {
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error: {error}</div>
  return (
    <Table>
    <TableHeader>
      <TableList>
        {users.map((user) => (
          <TableHeaderItem key={user.id} item={user}/>
        ))}
      </TableList>
    </TableHeader>
    <TableBody>
      <TableList>
        {users.map((user) => (
          <TableBodyItem key={user.id} item={user}/>
        ))}
      </TableList>
    </TableBody>
  </Table>
  )
}
