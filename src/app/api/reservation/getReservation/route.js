import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDB";

export async function POST(req) {
  try {
    // Parse the request body to get check-in and check-out dates
    const body = await req.json();
    const { checkIn, checkOut } = body;

    if (!checkIn || !checkOut) {
      return new NextResponse("Check-in and Check-out dates are required", {
        status: 400,
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Fetch all reservations including room information
    const reservations = await prisma.reservation.findMany({
      include: {
        room: true,
      },
    });

    // Extract the room IDs from the reservations that overlap with the requested dates
    const reservedRoomIds = reservations
      .filter((reservation) => {
        const reservationCheckIn = new Date(reservation.checkInDate);
        const reservationCheckOut = new Date(reservation.checkOutDate);
        return (
          (checkInDate >= reservationCheckIn &&
            checkInDate < reservationCheckOut) ||
          (checkOutDate > reservationCheckIn &&
            checkOutDate <= reservationCheckOut) ||
          (checkInDate <= reservationCheckIn &&
            checkOutDate >= reservationCheckOut)
        );
      })
      .map((reservation) => reservation.roomId);

    // Fetch all rooms excluding the ones that are reserved
    const Rooms = await prisma.room.findMany({
      where: {
        id: {
          notIn: reservedRoomIds,
        },
      },
    });

    return NextResponse.json({ Rooms }, { status: 200 });
  } catch (err) {
    console.error("Error fetching rooms:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
