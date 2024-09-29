import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import apiCall from "@/lib/rapidApiCall";


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
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if(!freeTrial && !isPro) {
        return new NextResponse("You have exceeded the free trial limit.", { status: 403 });
    }

    const data = await apiCall('POST', `create a portrait of ${prompt}`)
    if(!isPro){
        await incrementApiLimit();
    }
    return NextResponse.json(data);
   } catch (error) {
   
    return new NextResponse("Internal Error", { status: 500 });
   } 
}