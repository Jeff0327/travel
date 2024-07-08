// import { auth } from "@/auth";
// import { prisma } from "@/libs/prismaDB";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const session = await auth();
//   if (!session || !session.user) {
//     return new NextResponse("Not authenticated", { status: 401 });
//   }
//   try {
//     return new NextResponse(JSON.stringify("asd"), { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return new NextResponse("Server error", { status: 500 });
//   }
// }
// export async function POST() {}
