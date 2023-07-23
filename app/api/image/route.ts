// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import { Configuration, OpenAIApi } from "openai";
// import Replicate from "replicate";

// // const configuration = new Configuration({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // const openai = new OpenAIApi(configuration);

// const replicate = new Replicate({
//   auth: process.env.REOLICATE_API_TOKEN || ''
// });

// export async function POST(
//   req: Request
// ) {
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { prompt, amount = 1, resolution = "512x512" } = body;

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // if (!configuration.apiKey) {
//     //   return new NextResponse("OpenAI API Key not configured.", { status: 500 });
//     // }

//     if (!prompt) {
//       return new NextResponse("Prompt is required", { status: 400 });
//     }

//     if (!amount) {
//       return new NextResponse("Amount is required", { status: 400 });
//     }

//     if (!resolution) {
//       return new NextResponse("Resolution is required", { status: 400 });
//     }


//     // const response = await openai.createImage({
//     //   prompt,
//     //   n: parseInt(amount, 10),
//     //   size: resolution,
//     // });

//     const response = await replicate.run(
//       "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
//       {
//         input: {
//           prompt: prompt,
//           num_outputs: amount,
//           // height: Number(resolution.split("x")[0]),
//           // width: Number(resolution.split("x")[1]),
//         }
//       }
//     );


//     return NextResponse.json(response);
//   } catch (error) {
//     console.log('[IMAGE_ERROR]', error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// };



import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Replicate from "replicate";


const replicate = new Replicate({
    auth: process.env.REOLICATE_API_TOKEN || ''
});

export async function POST(
    req: Request
){
   try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt,amount = 1 } = body;
    
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
        return new NextResponse("Prompt is required", { status: 400 });
    }

    const response = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
        {
          input: {
            prompt: prompt,
            num_outputs: parseInt(amount, 10),
          }
        }
      );

    return NextResponse.json(response);
   } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
   } 
}