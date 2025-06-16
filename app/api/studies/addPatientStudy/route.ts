import { db } from '@/lib/db'
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    console.log("POST method")
    const body = await req.json();
    const { 
        patient_id, study_id, study_name, cpt_code, isInsurable, isTaxable
     } = body;
        try{
            const study = await db.patient_studies.create({
                data: {
                    patient_id,
                    study_id,
                    study_name,
                    cpt_code,
                    isInsurable,
                    isTaxable
                }
            })
            console.log("Patient study created successfully")
        
        
      return NextResponse.json({ study: study, message: 'Patient study created successfully'}, {status: 201})
    
    } catch (error) {
      console.log("Error creating patient study");
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        console.log("Error: "+error.message);
        // if (error.code === 'P2002') {
        //   console.log(
        //     'There is a unique constraint violation, a new user cannot be created with this email'
        //   )
        // }
      }
      return NextResponse.json({ study: null, message: 'Patient study failed to save'}, {status: 500})
    }
  } else {
    return NextResponse.json({ study: null, message: 'Method not allowed'}, {status: 405})
  }
}