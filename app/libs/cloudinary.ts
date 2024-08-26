"use client";

import axios from "axios";

export async function uploadImage(image: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "brghyizf");
  formData.append("cloud_name", `${process.env.CLOUDINARY_CLOUD_NAME}`);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/dpzzv94al/image/upload`,
    formData,
  );

  return response.data.url;
}
