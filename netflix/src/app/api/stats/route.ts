import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken";


export async function POST(request: NextRequest) {
  const tokenCookie = request.cookies.get("token");
  if (!tokenCookie) return NextResponse.json({}, { status: 403 });
  const decodedToken = jwt.verify(tokenCookie.value, process.env.HASURA_JWT_SECRET_KEY || "");
  return NextResponse.json({ msg: "it works", decodedToken });
}
