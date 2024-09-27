import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Replicate from "replicate";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { Configuration, OpenAIApi } from "openai";


export async function POST(
    req: Request
){
   try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

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
    const url = 'https://chatgpt-42.p.rapidapi.com/texttoimage';
    const options = {
    method: 'POST',
    headers: {
        'x-rapidapi-key': process.env.NEXT_PROTRAIT_API_KEY || '',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
        text: prompt,
        width: 512,
        height: 512
    })
    };
    const response = await fetch(url, options);
    const res = await response.text();
    const data = JSON.parse(res)

    if(!isPro){
        await incrementApiLimit();
    }
    return NextResponse.json(data);
   } catch (error) {
    console.log('[LOGO_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
   } 
}