import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


export async function POST(
    req: Request
){
   try {
    const { userId } = auth();
    const body = await req.json();
    const { link,lang  } = body;
    
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }


    if (!link) {
        return new NextResponse("Link is required", { status: 400 });
    }

    if (!lang) {
        return new NextResponse("Language is required", { status: 400 });
    }


    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if(!freeTrial && !isPro) {
        return new NextResponse("You have exceeded the free trial limit.", { status: 403 });
    }

    const url = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${link}&lang=${lang}&engine=2`
    
    const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.NEXT_PROTRAIT_API_KEY || '',
        'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com',
    },
    };

    const response = await fetch(url, options);
    const res = await response.text();
    const data = JSON.parse(res);
    
    if(!isPro){
        await incrementApiLimit();
    }
     return NextResponse.json(data.summary);
   } catch (error) {
    console.log('[SUMMARIZE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
   } 
}