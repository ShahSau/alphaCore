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
    const { prompt  } = body;
    
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
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt
        }
      }
    );
    await incrementApiLimit();
    return NextResponse.json(response);
   } catch (error) {
    console.log('[VIDEO_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
   } 
}