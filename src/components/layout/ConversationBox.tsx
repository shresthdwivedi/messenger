'use client';

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { ConversationType } from "@/lib/types/conversationTypes";
import useOtherUser from "@/hooks/useOtherUser";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { format } from "date-fns";

interface ConversationBoxProps {
    data: ConversationType,
    selected: boolean,
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected,
}) => {

    const otherUser = useOtherUser(data);

    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(async() => {
        router.push(`/conversations/${data.id}`)
    }, [data.id, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages[messages.length-1];
    }, [data.messages]);

    const userEmail = useMemo(() => {
        return session?.data?.user?.email;
    }, [session?.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) return false;

        const seenArray = lastMessage.seen || [];

        return seenArray.filter((user) => user.email === userEmail).length !== 0;
    }, [lastMessage, userEmail]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) return '📷 Image';

        if (lastMessage?.body) return lastMessage.body;

        return 'New Conversation';
    }, [lastMessage]);

    return (
        <div 
            onClick={handleClick} 
            className={clsx(
                "relative z-0 overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r from-[#9b6dff]/40 before:transition-transform before:duration-1000  hover:before:translate-x-[0%] hover:before:translate-y-[0%] w-full items-center flex flex-row gap-2 p-2 dark:bg-neutral-800 bg-neutral-100 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer", 
                selected && 'bg-neutral-300 dark:bg-neutral-900')}>
            <Avatar>
                <AvatarImage src={otherUser?.image as string} alt="user" />
                <AvatarFallback>
                    <Image className="rounded-2xl" src={'/image.png'} alt='user-photo' width={200} height={200} />    
                </AvatarFallback>
                {/* <span className="absolute block rounded-full h-2 w-2 bg-green-500 top-0 right-0 ring-2 ring-white md:h-3 md:w-3"/>  */}
            </Avatar>
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between items-center">
                            <p className="text-sm font-light dark:text-neutral-200 text-neutral-800 truncate">
                                {data.name || otherUser?.name}
                            </p>
                            {lastMessage?.createdAt && (
                                <p className="text-xs font-normal dark:text-neutral-500 text-neutral-600 mr-1">
                                    {format(new Date(lastMessage.createdAt), 'p')}
                                </p>
                            )}
                        </div>
                        <p className={clsx(
                            "text-sm truncate",
                            hasSeen ? 'font-normal dark:text-neutral-600 text-neutral-500' : 'dark:text-neutral-500 text-neutral-600 font-semibold'
                            )}
                        >   
                            {lastMessageText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox;