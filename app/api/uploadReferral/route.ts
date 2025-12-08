import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(req: NextRequest) {
    const sharp = require('sharp')

    const data = await req.formData()
    const file: File | null = data.get('file') as unknown as File
    const patientId = data.get('patientId') as string

    if(!file) {
        return NextResponse.json({message: 'No file to upload', success: false})
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Convert inches to pixels (assuming 300 DPI)
    const maxWidth = 8.5 * 300;
    const maxHeight = 11 * 300;

    const image = sharp(buffer);
    const metadata = await image.metadata();

    if (metadata.width > maxWidth || metadata.height > maxHeight) {
        image.resize({
            width: maxWidth,
            height: maxHeight,
            fit: sharp.fit.inside,
            withoutEnlargement: true
        });
    }

    //File data is now in the buffer, you can save or send as email
    const final = await image
            .toFormat('webp')
            .toBuffer(); // Convert to buffer instead of saving directly

    const path = join('/','patientData',patientId, 'referral.webp')
    await writeFile(path,final)
    console.log(`Open ${path} to see the uploaded file`)

    return NextResponse.json({message: 'File uploaded successfully!', success: true})
}