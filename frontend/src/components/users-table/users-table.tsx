import { IUser } from "@/types/user.interface";
import {
  Table,
  TableBody,
  TableBodyItem,
  TableHeader,
  TableHeaderItem,
  TableList,
} from "../ui/table";
import { useState } from "react";

interface IUsersTable {
  data: {
    users: IUser[];
    loading: boolean;
    error: string | null;
  };
}

export default function UsersTable({ data }: IUsersTable) {
  const { users, loading, error } = data;
  const [isHovered, setIsHovered] = useState<number | null>(null);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  const headeItems = ["id", "name", "roles", "email"];

  const onHoverEnter = (id: number) => {
    setIsHovered(id)
  }

  const onHoverLeave = () => {
    setIsHovered(null)
  }

  return (
    <Table>
      <TableHeader>
        <TableList>
          {headeItems.map((item, index) => (
            <TableHeaderItem key={index}>
              {item}
            </TableHeaderItem>
          ))}
        </TableList>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableList 
            key={user.id} 
            onMouseEnter={() => onHoverEnter(user.id)} 
            onMouseLeave={onHoverLeave} 
            isHovered={isHovered === user.id}
          >
            <TableBodyItem 
              key={user.id}
            >
                {user.id}
              </TableBodyItem>
            <TableBodyItem key={user.id}>{user.username}</TableBodyItem>
            <TableBodyItem key={user.id}>{user.roles}</TableBodyItem>
            <TableBodyItem key={user.id}>{user.email}</TableBodyItem>
          </TableList>
        ))}
      </TableBody>
    </Table>
  );
}
