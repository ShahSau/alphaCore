import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages, fromlang, tolang } = body;

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

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            `You are a senior developer whos is a master in ${fromlang} and ${tolang}.`,
        },
        {
          role: "user",
          content: `Convert the following code:\n\n\`\`\`\n${messages}\n\`\`\`\n from ${fromlang} to ${tolang}`,
        },
      ],
    });

    console.log(response);
    // if(!isPro){
    //     await incrementApiLimit();
    // }
    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
