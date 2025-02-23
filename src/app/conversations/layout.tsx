import ConversationList from "@/components/layout/ConversationList";
import Sidebar from "@/components/layout/Sidebar";

export default async function ConversationsLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <Sidebar>
            <div className="h-screen">
                <ConversationList initialItems={[]} />
                {children}
            </div>
        </Sidebar>
    )
}