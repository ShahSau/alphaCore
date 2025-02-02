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

    const url =
      "https://realistic-text-to-speech.p.rapidapi.com/v3/generate_voice_over_v2";

    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PROTRAIT_API_KEY || "",
        "x-rapidapi-host": "realistic-text-to-speech.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voice_obj: {
          id: 2014,
          voice_id: "en-US-Neural2-A",
          gender: "Male",
          language_code: "en-US",
          language_name: "US English",
          voice_name: "John",
          sample_text:
            "Hello, hope you are having a great time making your video.",
          sample_audio_url:
            "https://s3.ap-south-1.amazonaws.com/invideo-uploads-ap-south-1/speechen-US-Neural2-A16831901130600.mp3",
          status: 2,
          rank: 0,
          type: "google_tts",
          isPlaying: false,
        },
        json_data: [
          {
            block_index: 0,
            text: messages,
          },
        ],
      }),
    };

    const response = await fetch(url, options);
    const res = await response.text();
    const data = JSON.parse(res);

    // if(!isPro){
    //     await incrementApiLimit();
    // }

    return NextResponse.json({ data: data });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
