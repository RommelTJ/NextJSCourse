import { NextRequest, NextResponse } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken";

import { findVideoIdByUser } from "@/lib/db/hasura";


interface PostParams { videoId: string; }

export async function POST(request: NextRequest) {
  const tokenCookie = request.cookies.get("token");
  if (!tokenCookie) return NextResponse.json({}, { status: 403 });
  const decodedToken: JwtPayload | string = jwt.verify(tokenCookie.value, process.env.HASURA_JWT_SECRET_KEY || "");

  if (typeof decodedToken === "string") return NextResponse.json({}, { status: 400 });
  const tokenPayload = decodedToken as JwtPayload;
  const body: PostParams = await request.json();
  const userId = tokenPayload.issuer || "";
  const videoId = body.videoId;
  const findVideoId = await findVideoIdByUser(tokenCookie.value, userId, videoId);
  return NextResponse.json({ msg: "it works", decodedToken, findVideoId });
}
