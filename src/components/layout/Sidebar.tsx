import DesktopSidebar from "./DesktopSidebar"

async function Sidebar({
    children,
}: {
    children: React.ReactNode,
}) {
  return (
    <div className="h-full bg-[#FAFAFA] dark:bg-[#18181B]">
        <DesktopSidebar />
        <main className="lg:pl-20 h-full">
            {children}
        </main>
    </div>
  )
}
export default Sidebar