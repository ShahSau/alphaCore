import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Replicate from "replicate";


const replicate = new Replicate({
    auth: process.env.REOLICATE_API_TOKEN || ''
});

export async function POST(
    req: Request
){
   try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt} = body;
    
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
        return new NextResponse("Prompt is required", { status: 400 });
    }

    const response = await replicate.run(
      "lucataco/realistic-vision-v4.0:eded127fc9f01381b1d26b15e752ce80803263b852760c6bf16e3d70207fef84",
        {
          input: {
            prompt: `RAW photo, a portrait photo of ${prompt}`,
          }
        }
      );

    return NextResponse.json(response);
   } catch (error) {
    console.log('[PORTRAIT_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
   } 
}