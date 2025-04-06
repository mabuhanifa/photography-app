import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
  try {
    const categories = await Category.find({});
    return NextResponse.json(categories, { status: 200 });
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
    const body = await request.json();

    const newCategory = new Category(body);
    const existingCategory = await Category.findOne({
      name: newCategory.name,
    });
    if (existingCategory) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 409 }
      );
    }
    const savedCategory = await newCategory.save();
    return NextResponse.json(
      { message: "Category created successfully", category: savedCategory },
      { status: 201 }
    );
  } catch (dbError: any) {
    console.error("Error saving category:", dbError);

    if (dbError.code === 11000 && dbError.keyPattern?.name) {
      return NextResponse.json(
        { error: "Category name already exists", details: dbError.message },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to save category", details: dbError.message },
      { status: 400 }
    );
  }
}
