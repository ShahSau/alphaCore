import { Configuration, OpenAIApi,ChatCompletionRequestMessage } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
const configuration  = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

// const instructionMessage: ChatCompletionRequestMessage = {
//     role: "system",
//     content: `Write a lesson plan for an introductory algebra class. The lesson plan should cover the distributive law, in particular how it works in simple cases involving mixes of positive and negative numbers. Come up with some examples that show common student errors.`
// };


export async function POST(
    req: Request
){
   try {
    const { userId } = auth();
    const body = await req.json();
    const { messages  } = body;
    
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
        return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
        return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:messages
      });
     return NextResponse.json(response.data.choices[0].message);
   } catch (error) {
    console.log('[LESSON_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
   } 
}