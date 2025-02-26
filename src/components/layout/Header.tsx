'use client';

import useOtherUser from "@/hooks/useOtherUser";
import { ConversationType } from "@/lib/types/conversationTypes";
import { User } from "@prisma/client";
import { useMemo } from "react";
import { Separator } from "../ui/separator";

interface HeaderProps {
  conversation: ConversationType & {
    users: User[],
  },
}

const Header: React.FC<HeaderProps> = ({
  conversation,
}) => {

  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {

    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    };

    return 'Online'

  }, [conversation.isGroup, conversation.users.length]);

  return (
    <div className=" p-5 flex items-center gap-2 flex-row">
      Header
      <Separator orientation="vertical" className=""/>
    </div>
  )
}

export default Header