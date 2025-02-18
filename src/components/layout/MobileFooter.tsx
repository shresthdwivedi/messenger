'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItem";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

const MobileFooter = ({
  currentUser,
}: {
  currentUser: User | null,
}) => {

    const routes = useRoutes();
    const { isOpen } = useConversation();

    if(isOpen) {
        return null;
    }

  return (
    <div className="fixed justify-center center w-full bottom-0 z-40 flex items-center bg-[#FAFAFA] dark:bg-[#18181B] border-t-[1px] lg:hidden">
      {routes.map((route) => (
          <MobileItem
          key={route.label}
          href={route.href ?? '#'}
          label={route.label}
          active={route.active}
          icon={route.icon}
          onClick={route.onClick}
          />
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={null} className="flex-1 focus-visible:ring-0 flex items-center justify-center rounded-md py-7 relative z-0 overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r from-[#9b6dff]/40 before:transition-transform before:duration-1000 hover:before:translate-x-[0%] hover:before:translate-y-[0%]">
            <Avatar className="rounded-full">
              <AvatarImage className="rounded-full" src={currentUser?.image as string} alt="user" />
              <AvatarFallback>{currentUser?.name?.[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="top" className="w-52">
          <div className="px-2 py-2 gap-2 text-sm flex flex-row">
            <Avatar>
              <AvatarImage className="flex flex-row" src={currentUser?.image as string} alt="User" />
              <AvatarFallback>{currentUser?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-col flex">
            <p className="font-medium">{currentUser?.name}</p>
            <p className="text-gray-500 text-xs">{currentUser?.email}</p>
            </div>
          </div>
          <hr />
          <DropdownMenuItem onClick={() => signOut()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default MobileFooter