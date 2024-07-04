import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const cookieStore = cookies();
  const token = cookieStore.get("authjs.csrf-token")?.value;
  if (!token) {
    const protocol = req.nextUrl.protocol;
    const host = req.nextUrl.host;
    const redirectUrl = `${protocol}//${host}/auth/signin`;
    return NextResponse.redirect(redirectUrl);
  } else {
    return NextResponse.next();
  }
}
export const config = {
  //로그인 엑세스 url
  matcher: [],
};
