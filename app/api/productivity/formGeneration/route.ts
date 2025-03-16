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
    // const { prompt, mood, language, type, name, extra=""}:{
    //     prompt: string;
    //     mood: string;
    //     language: string;
    //     type: string;
    //     name: string;
    //     extra: string;
    // } = body;
    console.log(body, "BODY");
    const { messages } = body;
    
    // const instructionMessage: any = {
    //     role: "system",
    //     content: `You will be provided an email in ${language}. Write a response of the email. Please ensure that the response is written in the same language as the email, unless otherwise specified. The tone of the response should be ${mood}. This is a(n) ${type}. Your name is ${name}. If necessary, please use the following additional context to inform your response: ${extra}`
    // };

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
        return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
        return new NextResponse("Messages are required", { status: 400 });
    }
    // const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();


    // if(!freeTrial && !isPro) {
    //     return new NextResponse("You have exceeded the free trial limit.", { status: 403 });
    // }

    const formInstruction= `I am looking to create a ${messages}. Based on the that, generate a survey object with 3 fields: name(string) for the form, description(string) of the form and a questions array where every element has 2 fields: text and the fieldType and fieldType can be of these options RadioGroup, Select, Input, Textarea, Switch; and return it in json format. For RadioGroup, and Select types also return fieldOptions array with text and value fields. For example, for RadioGroup, and Select types, the field options array can be [{text: 'Yes', value: 'yes'}, {text: 'No', value: 'no'}] and for Input, Textarea, and Switch types, the field options array can be empty. For example, for Input, Textarea, and Switch types, the field options array can be []`
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:[
            {
                "role": "user",
                "content": formInstruction
            }
        ]
      });
      
    // if(!isPro){
    //     await incrementApiLimit();
    // }
     return NextResponse.json(response.data.choices[0].message);
   } catch (error) {

    return new NextResponse("Internal Error", { status: 500 });
   } 
}