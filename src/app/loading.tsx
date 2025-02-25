'use client';

import DesktopItem from "@/components/layout/DesktopItem";
import { Skeleton } from "@/components/ui/skeleton";
import useRoutes from "@/hooks/useRoutes";

const Loading = () => {

    const routes = useRoutes();

    return (
        <div>
            <div className="h-full bg-[#FAFAFA] dark:bg-[#18181B]">
                <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-99 lg:w-20 lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
                    <nav className="mt-4 flex flex-col lg:overflow-y-auto justify-between">
                        <ul role="list" className="flex-flex-col items-center space-y-1">
                            {routes.map((item) => (
                              <DesktopItem
                                key={item.label}
                                href={'#'}
                                label={item.label}
                                active={item.active}
                                icon={item.icon}
                              />
                            ))}
                        </ul>
                    </nav>
                    <div className="flex items-center justify-center pr-2">
                        <Skeleton className="h-10 w-10 rounded-2xl" />
                    </div>
                </div>
                <main className="lg:pl-20 h-full">
                    <div className="fixed inset-y-0 top-4 flex-col flex ">
                        <div className="mx-6 flex flex-row items-center justify-between w-screen lg:w-full">
                            <Skeleton className="h-8 w-[150px]" />
                            <div className="flex flex-row gap-8 items-center mr-10">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-4 rounded-full" />
                            </div>
                        </div>
                        <div className="mx-6 mt-8 flex-col flex gap-6">
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-10 w-10 rounded-2xl" />
                                <div className="space-y-2 flex flex-col justify-center">
                                  <Skeleton className="h-4 w-[150px]" />
                                  <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-10 w-10 rounded-2xl" />
                                <div className="space-y-2 flex flex-col justify-center">
                                <Skeleton className="h-4 w-[150px]" />
                                <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-10 w-10 rounded-2xl" />
                                <div className="space-y-2 flex flex-col justify-center">
                                <Skeleton className="h-4 w-[150px]" />
                                <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-10 w-10 rounded-2xl" />
                                <div className="space-y-2 flex flex-col justify-center">
                                  <Skeleton className="h-4 w-[150px]" />
                                  <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-10 w-10 rounded-2xl" />
                                <div className="space-y-2 flex flex-col justify-center">
                                  <Skeleton className="h-4 w-[150px]" />
                                  <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-10 w-10 rounded-2xl" />
                                <div className="space-y-2 flex flex-col justify-center">
                                  <Skeleton className="h-4 w-[150px]" />
                                  <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='h-full'>
                        <div className='hidden lg:block pl-80 h-screen'>
                            <div className='px-4 py-10 sm:px-6 lg:px-8 h-full flex items-center border-[#E4E4E7] border-l-[1px] dark:border-[#27272A] justify-center dark:bg-[#09090B] bg-neutral-200'>
                                <div className='text-center flex flex-col'>
                                    <h3 className='mt-2 text-2xl font-semibold text-neutral-600 dark:text-neutral-400 '>
                                        Select a chat or start a new conversation
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}


export default Loading;