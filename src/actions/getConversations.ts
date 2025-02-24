import prisma from "@/lib/db";
import getCurrentUser from "./getCurrentUser"

const getConversations = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return [];
    }

    try {

        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc',
            },
            where: {
                userIds: {
                    has: currentUser.id,
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true,
                    }
                }
            }
        })

        return conversations;

    } catch (error) {
        console.log('Error while fetching conversations:', error);
        return [];
    }
}

export default getConversations;