import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Replicate from "replicate";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

const replicate = new Replicate({
    auth: process.env.REOLICATE_API_TOKEN || ''
});

export async function POST(
    req: Request
){
   try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt,amount = 1 } = body;
    
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
        return new NextResponse("Prompt is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if(!freeTrial) {
        return new NextResponse("You have exceeded the free trial limit.", { status: 403 });
    }
    const response = await replicate.run(
      "laion-ai/erlich:92fa143ccefeed01534d5d6648bd47796ef06847a6bc55c0e5c5b6975f2dcdfb",
        {
          input: {
            prompt: prompt,
            batch_size: parseInt(amount, 10),
          }
        }
      );
      await incrementApiLimit();
    return NextResponse.json(response);
   } catch (error) {
    console.log('[LOGO_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
   } 
}