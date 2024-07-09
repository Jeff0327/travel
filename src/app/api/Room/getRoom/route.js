import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDB";

export async function GET() {
  try {
    const rooms = await prisma.room.findMany();

    return NextResponse.json(rooms, { status: 200 });
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
