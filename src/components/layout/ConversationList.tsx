'use client';

import useConversation from "@/hooks/useConversation";
import { ConversationType } from "@/lib/types/conversationTypes";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModeToggle } from "../ModeToggle";
import ConversationBox from "./ConversationBox";
import { MdOutlineGroupAdd } from "react-icons/md";
import { Button } from "../ui/button";

interface ConversationListProps {
  initialItems: ConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {

  const [items, setItems] = useState<ConversationType[]>(initialItems);

  const router = useRouter();
  const { conversationId, isOpen } = useConversation();

  return (
    <aside className={clsx('fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r', isOpen ? 'hidden' : 'block-full left-0')}>
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