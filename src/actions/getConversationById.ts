import prisma from "@/lib/db";
import getCurrentUser from "./getCurrentUser"

const getConversationById = async (
  conversationId: string,
) => {
  
  try {
    
    const currentUser = await getCurrentUser();
  
    if (!currentUser?.email) {
      return null;
    }
  
    const conversation = await prisma.conversation.findMany({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      }
    })
  
    return conversation[0];
    
  } catch (error: any) {
    return null;
  }

}

export default getConversationById