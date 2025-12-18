import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try{
        const {email, password} = await req.json();

        if (!email || !password) {
            return NextResponse.json({error: 'E-mail ve şifre gerekli'}, {status: 400});
        }
        const existingUser = await prisma.user.findUnique({
            where: {email},
        });
        if (existingUser) {
            return NextResponse.json({error: 'Bu email zaten kayıtlı.'}, {status: 400});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
            },
        });
        return NextResponse.json({user}, {status: 201});
    }   catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Sunucu Hatası'}, {status: 500});
    } 
}