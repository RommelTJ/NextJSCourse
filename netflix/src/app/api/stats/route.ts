import { NextRequest, NextResponse } from 'next/server'


export async function POST(request: NextRequest) {
  const tokenCookie = request.cookies.get("token");
  if (!tokenCookie) {
    return NextResponse.json({}, { status: 403 });
  }
  return NextResponse.json({ msg: "it works" });
}
