import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Replicate from "replicate";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { Configuration, OpenAIApi } from "openai";
// const replicate = new Replicate({
//     auth: process.env.REOLICATE_API_TOKEN || ''

// });
const configuration  = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)
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
    const isPro = await checkSubscription();

    if(!freeTrial && !isPro) {
        return new NextResponse("You have exceeded the free trial limit.", { status: 403 });
    }

    // const response = await replicate.run(
    //   "laion-ai/erlich:92fa143ccefeed01534d5d6648bd47796ef06847a6bc55c0e5c5b6975f2dcdfb",
    //     {
    //       input: {
    //         prompt: prompt,
    //         batch_size: parseInt(amount, 10),
    //       }
    //     }
    //   );
    const response = await openai.createImage({
      prompt: prompt,
      n: parseInt(amount, 10),
      size: "1024x1024",
    });
    // image_url = response.data[0].url;
    if(!isPro){
        await incrementApiLimit();
    }
    return NextResponse.json(response);
   } catch (error) {
    console.log('[LOGO_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
   } 
}