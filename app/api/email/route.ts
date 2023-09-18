import { Configuration, OpenAIApi,ChatCompletionRequestMessage } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

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
    const { prompt, mood, language, type, name, extra=""}:{
        prompt: string;
        mood: string;
        language: string;
        type: string;
        name: string;
        extra: string;
    } = body;
    
    const instructionMessage: any = {
        role: "system",
        content: `You will be provided an email in ${language}. Write a response of the email. Please ensure that the response is written in the same language as the email, unless otherwise specified. The tone of the response should be ${mood}. This is a(n) ${type}. Your name is ${name}. If necessary, please use the following additional context to inform your response: ${extra}`
    };

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
        return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!prompt) {
        return new NextResponse("Messages are required", { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();


    if(!freeTrial && !isPro) {
        return new NextResponse("You have exceeded the free trial limit.", { status: 403 });
    }
    const messages=`You will be provided an email in ${language}. Write a response of the email. Please ensure that the response is written in the same language as the email, unless otherwise specified. The tone of the response should be ${mood}. This is a(n) ${type}. Your name is ${name}. If necessary, please use the following additional context to inform your response: ${extra}\n${prompt}`
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:[
            {
                "role": "user",
                "content": messages
            }
        ]
      });
      
    if(!isPro){
        await incrementApiLimit();
    }

     return NextResponse.json(response.data.choices[0].message);
   } catch (error) {
    console.log('[EMAIL_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
   } 
}