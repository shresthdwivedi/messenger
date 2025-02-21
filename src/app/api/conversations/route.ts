import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {

        const currentUser = await getCurrentUser();
        const body = await req.json();
        const { userId, isGroup, name, members } = body;

        

    } catch (error: any) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}