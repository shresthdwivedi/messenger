'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import useRoutes from "@/hooks/useRoutes";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";

const DesktopSidebar = ({
  currentUser,
}: {
  currentUser: User | null,
}) => {

  const routes = useRoutes();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-99 lg:w-20 lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
      <nav className="mt-4 flex flex-col lg:overflow-y-auto justify-between">
        <ul role="list" className="flex-flex-col items-center space-y-1">
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href ?? '#'}
              label={item.label}
              active={item.active}
              icon={item.icon}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
      <div className="flex items-center justify-center pr-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <Button variant={null} className="focus-visible:ring-0 p-0">
                <Avatar>
                  <AvatarImage src={currentUser?.image as string} alt="user" />
                  <AvatarFallback>{currentUser?.name?.[0]}</AvatarFallback>
                  {/* <span className="absolute block rounded-full h-2 w-2 bg-green-500 top-0 right-0 ring-2 ring-white md:h-3 md:w-3"/> */}
                </Avatar>
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="right" className="w-52">
            <div className="px-2 py-2 gap-2 text-sm flex flex-row">
              <Avatar>
                <AvatarImage className="flex flex-row" src={currentUser?.image as string} alt="user" />
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
    </div>
  )
}

export default DesktopSidebar