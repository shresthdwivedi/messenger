'use client';

import useOtherUser from "@/hooks/useOtherUser";
import { ConversationType } from "@/lib/types/conversationTypes";
import { User } from "@prisma/client";
import { useMemo } from "react";
import Link from "next/link";
import { IoArrowBack, IoEllipsisHorizontalSharp } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
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
    <div className="w-full p-5 flex items-center justify-between">
      <div className="flex flex-row items-center gap-3 ">
        <Link
          href={'/conversations'}
          className="cursor-pointer lg:hidden block dark:text-neutral-400 text-neutral-800 dark:hover:text-neutral-500 hover:text-neutral-600"
        > 
          <IoArrowBack size={25}/>
        </Link>
        <div className="flex flex-row items-center">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src={otherUser?.image as string} alt="user" />
              <AvatarFallback>
                <Image className="rounded-2xl" src={'/image.png'} alt='user-photo' width={200} height={200} />    
              </AvatarFallback>
              {/* <span className="absolute block rounded-full h-2.5 w-2.5 bg-green-500 top-0 right-0 ring-2 ring-white"/> */}
            </Avatar>
            <Separator orientation="vertical" className="h-8 mx-4" />
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-lg dark:text-neutral-400 text-neutral-800">
              {otherUser?.name}
            </p>
            <p className="text-sm dark:text-neutral-400 text-neutral-800">
              {statusText}
            </p>
          </div>
        </div>
      </div>
      <IoEllipsisHorizontalSharp 
        size={25} 
        className="cursor-pointer dark:text-neutral-400 text-neutral-800 dark:hover:text-neutral-500 hover:text-neutral-600"
        onClick={() => {}}
      />
    </div>
  )
}

export default Header