import { NextResponse } from "next/server";
import { db } from '@/lib/db';

export async function GET() {
    try{
        const user = await db.user.findMany()
        console.log(user)
        return NextResponse.json({user: user, message: 'User found'}, {status: 200});
    }catch(e){
        return NextResponse.json({message: 'Something went wrong!'}, {status: 500});
    }
}