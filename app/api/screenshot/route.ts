import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const imageUrl = cloudinary.image(url, {
      type: "url2png",
      sign_url: true,
      transformation: [
        { width: 1200, height: 630, crop: "fill" },
        { fetch_format: "auto", quality: "auto" },
      ],
    });

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error generating screenshot:", error);
    return NextResponse.json(
      { error: "Failed to generate screenshot" },
      { status: 500 },
    );
  }
}
