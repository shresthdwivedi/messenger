import { usePathname } from "next/navigation";
import useConversation from "./useConversation";
import { useMemo } from "react";
import { useTheme } from "next-themes";
import { HiLogout, HiOutlineUsers } from "react-icons/hi"
import { signOut } from "next-auth/react";
const useRoutes = () => {
    const { conversationId } = useConversation();
    const pathname = usePathname();
    const { theme } = useTheme();

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: theme === 'dark' ? '/black-chat.svg' : '/white-chat.svg',
        },
        {
            label: 'Users',
            href: '/users',
            icon: HiOutlineUsers,
        },
        {
            label: 'Logout',
            onClick: () => signOut(),
            icon: HiLogout,
        }
    ], [pathname, conversationId]) 

    return routes;
}

export default useRoutes;