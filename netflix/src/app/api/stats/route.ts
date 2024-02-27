import { NextRequest, NextResponse } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken";
import { findVideoIdByUser, updateStats, insertStats } from "@/lib/db/hasura";


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
  const doesStatsExist = await findVideoIdByUser(tokenCookie.value, userId, videoId);

  const response = doesStatsExist
    ? await updateStats(tokenCookie.value, { watched: true, userId, videoId, favorited: 0 })
    : await insertStats(tokenCookie.value, { watched: false, userId, videoId, favorited: 0 });

  return NextResponse.json({ msg: "it works", response });
}
