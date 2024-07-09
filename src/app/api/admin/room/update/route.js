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
    const { id, roomName, price, options, maxOccupancy, size } = body;

    // Validate request body
    if (!id || !roomName || !price || !maxOccupancy || !size) {
      return new NextResponse("Invalid input", { status: 400 });
    }

    // Update room information
    const updatedRoom = await prisma.room.update({
      where: { id },
      data: {
        roomName,
        price,
        options,
        maxOccupancy,
        size,
      },
    });

    return NextResponse.json(updatedRoom);
  } catch (error) {
    console.error("Error updating room:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
