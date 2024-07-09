import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDB";

export async function GET(req) {
  const session = await getSession({ req });

  // Admin session check
  if (!session || !session.user || !session.user.isAdmin) {
    return new NextResponse("Not authenticated or not an admin", {
      status: 401,
    });
  }

  try {
    const rooms = await prisma.room.findMany();

    return NextResponse.json(rooms);
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
