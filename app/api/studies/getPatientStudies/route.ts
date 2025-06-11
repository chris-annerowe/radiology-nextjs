import { db } from "@/lib/db";
import { toJSON } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    if (req.method === 'PUT') {
      console.log("PUT method ")
      const body = await req.json();
      const { 
        patient_id
       } = body;
       console.log("Patient id ",patient_id)
      try {
        const studies = await db.patient_studies.findMany({
          where: { patient_id}
        });
        return NextResponse.json({ studies: JSON.parse(toJSON(studies)), message: 'Patient studies for id retrieved successfully: ',patient_id}, {status: 200})
      } catch (error) {
        return NextResponse.json({ studies: null, message: 'Patient studies failed to retrieve'}, {status: 500})
      }
    } else {
      return NextResponse.json({ studies: null, message: 'Method not allowed'}, {status: 405})
    }
  }