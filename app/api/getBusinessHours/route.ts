import { db } from "@/lib/db";
import { toJSON } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const config = await db.business_Hours.findMany();
  
      return NextResponse.json({ config: config, message: 'Business hours retrieved successfully' ,status:200});
    } catch (error) {
      console.error('Error executing query', error);
      return NextResponse.json({ error: 'Internal Server Error' ,status:500});
    }
  }
  
  
  export async function PUT(req: Request) {
    if (req.method === 'PUT') {
      console.log("PUT method ")
      const body = await req.json();
      const {  
        opening_time,
        closing_time,
        interval
       } = body;
       
      try {
        const configurationData = {
            business_hours_id: 1,
            opening_time: opening_time,
            closing_time: closing_time,
            interval: interval,
            updatedBy: 'admin',      //TODO: update to save signed in user
            timestamp: new Date()
        }
        console.log("Payload to DB:", configurationData);
        const configuration = await db.business_Hours.upsert({
            where: {
                business_hours_id: 1
            },
            update: configurationData,
            create: configurationData
        })
        return NextResponse.json({ config: JSON.parse(toJSON(configuration)), message: 'Business hours retrieved successfully'}, {status: 200})
      } catch (error) {
        console.error("Upsert error:", error);
        return NextResponse.json({ config: null, message: 'Business hours failed to retrieve'}, {status: 500})
      }
    } else {
      return NextResponse.json({ config: null, message: 'Method not allowed'}, {status: 405})
    }
  }