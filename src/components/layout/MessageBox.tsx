'use client';

import { MessageType } from "@/lib/types/conversationTypes";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "../ui/chat/chat-bubble";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";

interface MessageBoxProps {
  data: MessageType,
  isLast?: boolean,
}

const MessageBox: React.FC<MessageBoxProps> = ({
  data,
  isLast,
}) => {

  const session = useSession();
  const isSent = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
  .filter((user) => user.email !== data?.sender?.email)
  .map((user) => user.name)
  .join(', ')

  return (
    <div>
      <ChatBubble variant={isSent ? "sent" : "received"}>
        <ChatBubbleAvatar src={isSent ? session?.data?.user?.image ?? undefined: data?.sender?.image ?? undefined} fallback={isSent ? session?.data?.user?.name?.charAt(0) : data?.sender?.name?.charAt(0)} />
        <ChatBubbleMessage 
          variant={isSent ? "sent" : "received"}
          senderName={data?.sender?.name || "Unknown"} 
          timestamp={format(new Date(data.createdAt), 'p')}
        >
          {data?.image ? (
            <div className="rounded-md p-0">
              <Image 
                className="object-cover rounded-md cursor-pointer hover:scale-110 transition translate" 
                alt='message-pic' 
                src={data.image} 
                width={288} 
                height={288}
              />
            </div>
          ) : (
            <div>
              {data.body}
            </div>
          )}
        </ChatBubbleMessage>
      </ChatBubble>
      {isLast && isSent && seenList.length > 0 && (
        <div className="flex pr-12 justify-end text-xs font-light text-gray-500 dark:text-gray-400">
          {`Seen by ${seenList}`}
        </div>
      )}
    </div>
  )
}

export default MessageBox