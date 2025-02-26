'use client';

import { User } from "@prisma/client";
import UserBox from "./UserBox";
import { ModeToggle } from "../ModeToggle";

interface UsersListProps {
  users: User[],
}

const UsersList: React.FC<UsersListProps> = ({
  users,
}) => {



  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 overflow-y-auto border-r block w-full left-0 ">
      <div className="px-5">
        <div className="flex-col gap-2 flex">
          <div className="flex items-center flex-row justify-between">
            <h2 className="pl-2 text-2xl font-bold dark:text-neutral-400 text-neutral-800 py-4">Messenger</h2>
            <ModeToggle />
          </div>
          <hr />
          {users.map((user) => (
            <UserBox 
              key={user.id}
              data={user}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}

export default UsersList