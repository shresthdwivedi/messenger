'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const DesktopSidebar = () => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
      <div className="flex flex-col">
        Desktop Item
      </div>
      <div className="flex items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={null} className="focus-visible:ring-0 p-0">
              <Avatar>
                <AvatarImage src="/white-chat.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="right" className="w-52">
            <div className="px-2 py-2 gap-2 text-sm flex flex-row">
              <Avatar>
                <AvatarImage className="flex flex-row" src="/white-chat.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-col flex">
              <p className="font-medium">John Doe</p>
              <p className="text-gray-500 text-xs">john.doe@example.com</p>
              </div>
            </div>
            <hr />
            <DropdownMenuItem onClick={() => signOut()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default DesktopSidebar