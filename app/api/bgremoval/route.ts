import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return new NextResponse("Image file is required", { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");


    const imgbbForm = new URLSearchParams();
    imgbbForm.append("key", process.env.IMGBB_API_KEY || "");
    imgbbForm.append("image", base64Image);

    const imgbbRes = await axios.post(
      "https://api.imgbb.com/1/upload",
      imgbbForm,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    );

    const publicImageUrl = imgbbRes.data.data.url;
    const encodedParams = new URLSearchParams();

    encodedParams.set("image_url", publicImageUrl);

    const options = {
      method: "POST",
      url: "https://background-removal-ai.p.rapidapi.com/remove-background",
      headers: {
        "x-rapidapi-key": process.env.RapidAPI_Key || "",
        "x-rapidapi-host": "background-removal-ai.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: encodedParams,
    };

    const response = await axios.request(options);

    const finalImageUrl = response.data.image_url;

    if (!finalImageUrl) {
      throw new Error("API did not return an image_url");
    }

    return NextResponse.json({ generated_image: finalImageUrl });
  } catch (error: any) {
    console.error("Error Message:", error.message);
    if (error.response) {
      console.error("Error Data:", error.response.data);
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}
