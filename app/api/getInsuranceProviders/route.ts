import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const insuranceProviders:any = await db.pos_insurance.findMany();
  
      return NextResponse.json({ insuranceProviders: insuranceProviders, message: 'Insurance Providers retrieved successfully' ,status:200});
    } catch (error) {
      console.error('Error executing query', error);
      return NextResponse.json({ error: 'Internal Server Error' ,status:500});
    }
  }
  