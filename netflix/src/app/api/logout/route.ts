import { magicAdmin } from "@/lib/magic";
import { NextRequest, NextResponse } from "next/server";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

import { getTokenFromCookie } from "@/app/api/stats/route";

export async function POST(request: NextRequest) {
  const cookie: RequestCookie | undefined = cookies().get('token');
  if (!cookie) return NextResponse.json({ message: "User is not logged in" }, { status: 401 });

  const cookieData = getTokenFromCookie(cookie);
  if (!cookieData) return NextResponse.json({ message: "User is not logged in" }, { status: 401 });

  cookies().delete("token");
  await magicAdmin.users.logoutByIssuer(cookieData.userId)

  return NextResponse.redirect("http://localhost:3000/login");
}
