'use client';

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";

interface UserBoxProps {
    data: User,
}

const UserBox: React.FC<UserBoxProps> = ({
    data,
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(async() => {
        setIsLoading(true);
        toast.loading('Opening conversation...');

        axios.post('/api/conversations', {
            userId: data.id,
        })
        .then((data) => {
            toast.dismiss();
            router.push(`/conversations/${data.data.id}`)
        })
        .catch((error) => {
            toast.dismiss()
            toast.error('An error occurred');
        })
        .finally(() => setIsLoading(false));

    }, [data, router])

    return (
        <div 
        onClick={handleClick}
        className="relative z-0 overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r from-[#9b6dff]/40 before:transition-transform before:duration-1000  hover:before:translate-x-[0%] hover:before:translate-y-[0%] w-full items-center flex flex-row gap-2 p-2 dark:bg-neutral-800 bg-neutral-100 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer "
        >
            <Avatar>
                <AvatarImage src={data?.image as string} alt="user" />
                <AvatarFallback>
                    <Image className="rounded-2xl" src={'/image.png'} alt='user-photo' width={200} height={200} />    
                </AvatarFallback>
                {/* <span className="absolute block rounded-full h-2 w-2 bg-green-500 top-0 right-0 ring-2 ring-white md:h-3 md:w-3"/>  */}
            </Avatar>
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium dark:text-neutral-200 text-neutral-800">
                            {data.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBox