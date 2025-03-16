import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import axios from 'axios';

export async function POST(
    req: Request
){
   try {
    const { userId } = auth();
    const body = await req.json();
    const { gender,age, ethnicity } = body;

    console.log("FFF",body)

    // const encodedParams = new URLSearchParams();
    
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }


    if (!gender || !age || !ethnicity) {
        return new NextResponse("Messages are required", { status: 400 });
    }


    // const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();

    // if(!freeTrial && !isPro) {
    //     return new NextResponse("You have exceeded the free trial limit.", { status: 403 });
    // }

    console.log("HHHH")
console.log('API_KEY:', process.env.NEXT_RapidAPI_Key);
console.log('djdhdhdhd:', process.env.NEXT_PROTRAIT_API_KEY);

    const response = await axios.get(`https://face-studio.p.rapidapi.com/generate?gender=${gender}&age=${age}&ethnicity=${ethnicity}`, {
        headers: {
            'x-rapidapi-key': process.env.NEXT_PROTRAIT_API_KEY,
            'x-rapidapi-host': 'face-studio.p.rapidapi.com'
          },
    //   params,
      responseType: 'blob', // Ensure the response is treated as a binary data
    });

    console.log('Face generated:', response.data);
    // if(!isPro){
    //     await incrementApiLimit();
    // }
     return NextResponse.json(response);
   } catch (error) {
    
    return new NextResponse("Internal Error", { status: 500 });
   } 
}