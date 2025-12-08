import { db } from "@/lib/db";
import { toJSON } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const modalities:any = await db.modality_codes.findMany();
  
      return NextResponse.json({ modalities: modalities, message: 'Modalities retrieved successfully' ,status:200});
    } catch (error) {
      console.error('Error executing query', error);
      return NextResponse.json({ error: 'Internal Server Error' ,status:500});
    }
  }

export async function POST(req: Request) {
  if (req.method === 'POST') {
    console.log("Add new modality")
    const body = await req.json();
    const { 
      name,
      code,
      description
     } = body;
    try {
      const modality = await db.modality_codes.create({
        data: {
          modality_name: name,
          modality_code: code,
          modality_description: description
        },
      });
      return NextResponse.json({ modality: modality, message: 'Modality added successfully'}, {status: 201})
    } catch (error) {
      console.log("Error creating modality");
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        console.log("Error: "+error.message);
        if (error.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this email'
          )
        }
      }
      return NextResponse.json({ modality: null, message: 'Modality failed to save'}, {status: 500})
    }
  } else {
    return NextResponse.json({ modality: null, message: 'Method not allowed'}, {status: 405})
  }
}

export async function DELETE(req: Request) {
    if (req.method === 'DELETE') {
      const body = await req.json();
      const { 
        code
       } = body;
       console.log("Modality id ",code)
      try {
        const modality = await db.modality_codes.delete({
          where: { modality_code: code }
        });
        return NextResponse.json({ modality: JSON.parse(toJSON(modality)), message: 'Modality for id deleted successfully: ',code}, {status: 200})
      } catch (error) {
        return NextResponse.json({ message: 'modality failed to delete', error}, {status: 500})
      }
    } else {
      return NextResponse.json({ message: 'Method not allowed'}, {status: 405})
    }
  }

export async function PUT(req: Request) {
    if (req.method === 'PUT') {
      console.log("UPDATE method")
      const body = await req.json();
      const { 
        code, name, description
       } = body;
      try {
        const modality = await db.modality_codes.update({
          where: { 
            modality_code: code
          },
          data: {
            modality_name: name,
            modality_description: description
          },
        });
        return NextResponse.json({ modality: modality, message: 'Modality updated successfully'}, {status: 200})
      } catch (error) {
        return NextResponse.json({ modality: null, message: 'Modality failed to update'}, {status: 500})
      }
    } else {
      return NextResponse.json({ message: 'Method not allowed'}, {status: 405})
    }
  }