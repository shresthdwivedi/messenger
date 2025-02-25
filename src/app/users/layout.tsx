import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/layout/Sidebar";
import UsersList from "@/components/layout/UsersList";

export default async function UsersLayout({
    children,
}: {
    children: React.ReactNode,
}) {

  const users = await getUsers();
  return (
    <Sidebar>
      <div className='h-screen'>
        <UsersList users={users} />
        {children}
      </div>
    </Sidebar>
  )
}
