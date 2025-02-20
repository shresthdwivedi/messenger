import prisma from "@/lib/db";
import getSession from "./getSession";

const getUsers = async () => {
    const session = await getSession();

    try {
        if (!session?.user?.email) {
            return []
        }

        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                NOT: {
                    email: session.user.email,
                }
            }
        })

        return users;
    } 
    catch (error: any) {
        return [];
    }
}

export default getUsers