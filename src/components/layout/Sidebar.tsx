import getCurrentUser from "@/actions/getCurrentUser"
import DesktopSidebar from "./DesktopSidebar"
import MobileFooter from "./MobileFooter"

async function Sidebar({
    children,
}: {
    children: React.ReactNode,
}) {

  const currentUser = await getCurrentUser();

  return (
    <div className="h-full bg-[#FAFAFA] dark:bg-[#18181B]">
        <DesktopSidebar currentUser={currentUser!} />
        <MobileFooter currentUser={currentUser}/>
        <main className="lg:pl-20 h-full">
            {children}
        </main>
    </div>
  )
}
export default Sidebar