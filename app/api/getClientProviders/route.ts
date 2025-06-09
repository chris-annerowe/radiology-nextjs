import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const clientProviders:any = await db.pos_clientProviders.findMany();
  
      return NextResponse.json({ clientProviders: clientProviders, message: 'Client Providers retrieved successfully' ,status:200});
    } catch (error) {
      console.error('Error executing query', error);
      return NextResponse.json({ error: 'Internal Server Error' ,status:500});
    }
  }
  