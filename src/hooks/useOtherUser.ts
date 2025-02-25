import { ConversationType } from "@/lib/types/conversationTypes"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (conversation: ConversationType | {
    users: User[]
}) => {
  
    const session = useSession();
    
    const otherUser = useMemo(() => {
        const currentUserEmail = session?.data?.user?.email;
        return conversation.users.find((user) => user.email !== currentUserEmail);
        
    }, [session?.data?.user?.email, conversation.users])
    
    return otherUser;
}

export default useOtherUser