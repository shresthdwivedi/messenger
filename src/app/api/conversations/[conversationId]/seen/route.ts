import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/db';
import { NextResponse } from "next/server";
import { FaTruckMedical } from 'react-icons/fa6';

interface Params {
  conversationId?: string,
};

export async function POST (
  req: Request,
  { params }: { params: Params},
) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = await params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized Access', { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          }
        },
        users: true,
      }
    });

    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const lastMessage = conversation.messages[conversation.messages.length-1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      }
    });

    return NextResponse.json(updatedMessage);

  } catch (error: any) {
    console.log(error , 'ERROR_MESSAGES_SEEN');
    return new NextResponse("Internal Error", { status: 500});
  }
}