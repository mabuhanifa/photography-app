import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
  return NextResponse.json({ message: "Hello, World!" });
}
