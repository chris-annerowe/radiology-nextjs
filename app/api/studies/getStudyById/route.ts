import { db } from "@/lib/db";
import { toJSON } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    if (req.method === 'PUT') {
      const body = await req.json();
      const { 
        study_id
       } = body;
       console.log("Study id ",study_id)
      try {
        const studies = await db.studies.findMany({
          where: { study_id}
        });
        return NextResponse.json({ studies: JSON.parse(toJSON(studies)), message: 'study for id retrieved successfully: ',study_id}, {status: 200})
      } catch (error) {
        return NextResponse.json({ studies: null, message: 'studies failed to retrieve'}, {status: 500})
      }
    } else {
      return NextResponse.json({ studies: null, message: 'Method not allowed'}, {status: 405})
    }
  }