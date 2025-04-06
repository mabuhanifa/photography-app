import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import "@/models/Category";
import Photography from "@/models/Photography";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
  try {
    const photographs = await Photography.find({}).populate("category");
    return NextResponse.json(photographs, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const jsonString = formData.get("json") as string | null;
    const imageFile = formData.get("") as File | null;

    if (!jsonString || !imageFile) {
      return NextResponse.json(
        { error: "Missing 'hello' data or image file" },
        { status: 400 }
      );
    }

    let parsedData: { title?: string; category?: string } = {};
    try {
      parsedData = JSON.parse(jsonString);
      if (!parsedData.title) {
        return NextResponse.json(
          { error: "Missing 'title' field in  JSON" },
          { status: 400 }
        );
      }
    } catch (error: any) {
      return NextResponse.json(
        { error: "Invalid JSON format ", details: error.message },
        { status: 400 }
      );
    }

    if (!imageFile || !(imageFile instanceof File)) {
      return NextResponse.json(
        { error: "Invalid image file provided" },
        { status: 400 }
      );
    }

    try {
      const buffer = await imageFile.arrayBuffer();
      const bytes = Buffer.from(buffer);

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream((error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          })
          .end(bytes);
      });

      if (!uploadResult?.secure_url) {
        return NextResponse.json(
          { error: "Failed to upload image to Cloudinary" },
          { status: 500 }
        );
      }

      const newPhotography = new Photography({
        title: parsedData.title,
        image: uploadResult.secure_url,
        category: parsedData.category,
      });

      //   const existingPhotography = await Photography.findOne({
      //     title: newPhotography.title,
      //   });

      //   if (existingPhotography) {
      //     await cloudinary.uploader.destroy(uploadResult.public_id);
      //     return NextResponse.json(
      //       { error: "Photography with this title already exists" },
      //       { status: 409 }
      //     );
      //   }

      const savedPhotography = await newPhotography.save();

      return NextResponse.json(
        {
          message: "Photography created successfully",
          photography: savedPhotography,
        },
        { status: 201 }
      );
    } catch (uploadError: any) {
      console.error(
        "Error uploading image or saving photography:",
        uploadError
      );
      return NextResponse.json(
        {
          error: "Failed to upload image or save photography",
          details: uploadError.message,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error processing form data:", error);
    return NextResponse.json(
      { error: "Failed to process form data", details: error.message },
      { status: 400 }
    );
  }
}
