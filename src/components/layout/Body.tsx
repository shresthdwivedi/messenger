'use client';

import useConversation from "@/hooks/useConversation";
import { MessageType } from "@/lib/types/conversationTypes";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { ChatMessageList } from "../ui/chat/chat-message-list";
import axios from "axios";


interface BodyProps {
  initialMessages: MessageType[];
}

const Body: React.FC<BodyProps> = ({
  initialMessages,
}) => {

  const [messages, setMessages] = useState(initialMessages);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex flex-col overflow-y-auto h-full w-full p-2 rounded-2xl justify-between">
      <ChatMessageList>
        {messages.map((message, i) => ( 
          <MessageBox 
            isLast={i === messages.length - 1}
            key={message.id}
            data={message}
          />
        ))}
      </ChatMessageList>
    </div>
  )
}

export default Body