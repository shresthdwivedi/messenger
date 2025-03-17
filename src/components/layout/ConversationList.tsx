'use client';

import useConversation from "@/hooks/useConversation";
import { ConversationType } from "@/lib/types/conversationTypes";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ModeToggle } from "../ModeToggle";
import ConversationBox from "./ConversationBox";
import { MdOutlineGroupAdd } from "react-icons/md";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

interface ConversationListProps {
  initialItems: ConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  const session = useSession();
  const [items, setItems] = useState<ConversationType[]>(initialItems);

  const router = useRouter();
  const { conversationId, isOpen } = useConversation();
  const pusherKey = useMemo(() => {
    return session?.data?.user?.email;
  },[session?.data?.user?.email]);
  
  useEffect(() => {
    if (!pusherKey) {
      return ;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: ConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      })
    };

    const updateHandler = (conversation: ConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages,
          };
        }
        return currentConversation;
      }))
    };

    const removeHandler = (conversation: ConversationType) => {
      setItems((current) => current.filter((currentConversation) => currentConversation.id !== conversation.id))
      if (conversationId === conversation.id) {
        router.push('/conversations');
      }
    }

    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:delete', removeHandler);
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new', newHandler);
      pusherClient.unbind('conversation:update', updateHandler);
      pusherClient.unbind('conversation:delete', removeHandler);
    }
  }, [pusherKey, conversationId, router])

  return (
    <aside className={clsx('fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r w-full', isOpen ? 'hidden' : 'block w-full left-0')}>
      <div className="px-5">
        <div className="flex-col gap-2 flex">
          <div className="flex items-center flex-row justify-between">
            <h2 className="pl-2 text-2xl font-bold dark:text-neutral-400 text-neutral-800 py-4">Conversations</h2>
            <div className="flex flex-row gap-2 items-center justify-center">
              <Button variant="ghost" size="icon">
                <MdOutlineGroupAdd/>
              </Button>
              <ModeToggle />
            </div>
          </div>
          <hr />
          {items.map((item) => (
            <ConversationBox 
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}

export default ConversationList