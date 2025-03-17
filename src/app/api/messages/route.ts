import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { message, conversationId, image } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          }
        },
        sender: {
          connect: {
            id: currentUser.id,
          }
        },
        seen: {
          connect: {
            id: currentUser.id,
          }
        } 
      },
      include: {
        sender: true,
        seen: true,
      }
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          }
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          }
        }
      }
    });

    await pusherServer.trigger(conversationId, 'messages:new', newMessage);

    const lastMessage = updatedConversation.messages[updatedConversation.messages.length-1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: conversationId,
        messages: [lastMessage],
      })
    })

    return NextResponse.json(newMessage);

  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}