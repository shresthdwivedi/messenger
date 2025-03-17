'use client';

import useConversation from "@/hooks/useConversation";
import { MessageType } from "@/lib/types/conversationTypes";
import { useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import { ChatMessageList } from "../ui/chat/chat-message-list";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";


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

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    const messageHandler = (message: MessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      
      setMessages((current) => {
        if (find(current, { id: message.id})) {
          return current;
        }
        return [...current, message];
      })
    }
    
    const updateMessageHandler = (newMessage: MessageType) => {
      setMessages((current) => current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        })
      )
    }

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('message:update', updateMessageHandler);
    }
  }, [])

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