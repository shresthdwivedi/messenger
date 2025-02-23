import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/db";
import { conversationSchema } from "@/lib/types/conversationsSchema";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {

        const currentUser = await getCurrentUser();
        const body = await req.json();
        const validatedBody = conversationSchema.safeParse(body);
        
        if (!validatedBody.success) {
            return new NextResponse('Invalid conversation data', { status: 400 });
        };

        const { userId, isGroup, name, members } = validatedBody.data;
        
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        };
        
        if (isGroup) {
            if (!members || members.length<2 || !name) {
                return new NextResponse('Invalid data', { status: 400 });
            };
            
            const newConversation = await prisma.conversation.create({
                data: {
                    name, 
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value,
                            })),
                            {
                                id: currentUser.id,
                            }
                        ]
                    }
                },
                include: {
                    users: true,
                }
            })
            return NextResponse.json(newConversation);
        }  

        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        },
                    },
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    }
                ]
            }
        });

        const singleConversation = existingConversations[0];

        if (singleConversation) {
            return NextResponse.json(singleConversation);
        };

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id,
                        },
                        {
                            id: userId,
                        }
                    ]
                }
            },
            include: {
                users: true,
            }
        });

        return NextResponse.json(newConversation);
        
    } catch (error: any) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}