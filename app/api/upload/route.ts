import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";


cloudinary.config({
  cloud_name: 'dpmilifuv',
  api_key: '562944291369268',
  api_secret: 'rfgRpt8PRBbRq4VmxWt3aAurlew',
  secure: true,
});


export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as Blob;

        if(!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, (error, result) => {
                if(error) reject(error);
                else resolve(result);
            }).end(buffer);
        });

        return NextResponse.json(result);    
    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}
