import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { gender, age, ethnicity } = body;
    
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    if (!gender || !age || !ethnicity) {
      return new NextResponse("Gender, age, and ethnicity are required", { status: 400 });
    }
    
    // const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();
    
    // if(!freeTrial && !isPro) {
    //   return new NextResponse("You have exceeded the free trial limit.", { status: 403 });
    // }
    
    
    const response = await axios.get(`https://face-studio.p.rapidapi.com/generate?gender=${gender}&age=${age}&ethnicity=${ethnicity}`, {
      headers: {
        'x-rapidapi-key': process.env.NEXT_PROTRAIT_API_KEY,
        'x-rapidapi-host': 'face-studio.p.rapidapi.com'
      },
      responseType: 'arraybuffer',
    });
    
    // Convert the arraybuffer to base64
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;
    
    console.log('Face generated successfully');
    
   
    // if(!isPro){
    //   await incrementApiLimit();
    // }
    
    return NextResponse.json(imageUrl);
  } catch (error) {
    console.error("Error generating portrait:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}