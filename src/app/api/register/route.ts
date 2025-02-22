import bcrypt from 'bcryptjs'
import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { signupSchema } from '@/lib/types/authSchema';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedBody = signupSchema.safeParse(body);
        
        if (!validatedBody.success) {
            return new NextResponse('Invalid credentials', { status: 400 });
        }
        
        const { name, email, password, confirmPassword } = validatedBody.data;
        
        if(!(name && email && password)) {
            return new NextResponse('Missing credentials', { status: 400 });
        }

        if (password !== confirmPassword) {
            return new NextResponse('Passwords do not match', { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            }
        })

        return NextResponse.json(user);
    }
    catch(error: any) {
        console.log('REGISTRATION_ERROR', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}