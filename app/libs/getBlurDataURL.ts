import { getPlaiceholder } from "plaiceholder";

export async function getBlurDataURL(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
    }
    const buffer = await res.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));
    return base64;
  } catch (err) {
    console.error("Error generating blur data URL:", err);
    return null;
  }
}
