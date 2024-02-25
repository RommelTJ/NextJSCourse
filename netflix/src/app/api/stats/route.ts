import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

import { findVideoIdByUser } from "@/lib/db/hasura";


export async function POST(request: NextRequest) {
  const tokenCookie = request.cookies.get("token");
  if (!tokenCookie) return NextResponse.json({}, { status: 403 });
  const decodedToken = jwt.verify(tokenCookie.value, process.env.HASURA_JWT_SECRET_KEY || "");
  const userId = "didToken";
  const videoId = "4zH5iYM4wJo";
  const findVideoId = await findVideoIdByUser(tokenCookie.value, userId, videoId);
  return NextResponse.json({ msg: "it works", decodedToken, findVideoId });
}
