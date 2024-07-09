import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDB";

export async function POST(req) {
  try {
    const session = await getSession({ req });

    // Admin session check
    if (!session || !session.user || !session.user.isAdmin) {
      return new NextResponse("Not authenticated or not an admin", {
        status: 401,
      });
    }

    const body = await req.json();
    const { roomName, price, options, maxOccupancy, size } = body;

    // Validate request body
    if (!roomName || !price || !maxOccupancy || !size) {
      return new NextResponse("Invalid input", { status: 400 });
    }

    // Create new room
    const newRoom = await prisma.room.create({
      data: {
        roomName,
        price,
        options,
        maxOccupancy,
        size,
      },
    });

    // Return the created room information as JSON
    return NextResponse.json(newRoom);
  } catch (error) {
    console.error("Error creating room:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
