import { usePathname } from "next/navigation";
import useConversation from "./useConversation";
import { useMemo } from "react";
import { HiOutlineUsers } from "react-icons/hi"
import { IoChatbubbleOutline } from "react-icons/io5";
import { useRouter } from "next/router";

interface ItemProps {
    label: string;
    href?: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}

const useRoutes = () => {
    const { conversationId } = useConversation();
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: IoChatbubbleOutline,
            active: pathname === '/conversations' || !!conversationId,

        },
        {
            label: 'Users',
            href: '/users',
            icon: HiOutlineUsers,
            active: pathname === '/users',
        },
    ] as ItemProps[] , [pathname, conversationId]) 

    return routes;
}

export default useRoutes;