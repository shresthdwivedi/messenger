import Sidebar from "@/components/layout/Sidebar";


export default async function UsersLayout({
    children,
}: {
    children: React.ReactNode,
}) {
  return (
    <Sidebar>
        <div className='h-full'>
            {children}
        </div>
    </Sidebar>
  )
}
