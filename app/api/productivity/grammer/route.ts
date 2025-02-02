import { Configuration } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});



export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    const encodedParams = new URLSearchParams();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();

    // if(!freeTrial && !isPro) {
    //     return new NextResponse("You have exceeded the free trial limit.", { status: 403 });
    // }

    const url = "https://textgears-textgears-v1.p.rapidapi.com/correct";
    encodedParams.set("text", messages);

    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PROTRAIT_API_KEY || "",
        "x-rapidapi-host": "textgears-textgears-v1.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encodedParams,
    };

    // if(!isPro){
    //     await incrementApiLimit();
    // }
    const response = await fetch(url, options);
    const res = await response.text();
    const data = JSON.parse(res);

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
