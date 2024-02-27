import { NextRequest, NextResponse } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken";
import { findVideoIdByUser, updateStats, insertStats } from "@/lib/db/hasura";


interface PostParams { videoId: string; favorited: number; watched: boolean; }

export async function POST(request: NextRequest) {
  const tokenCookie = request.cookies.get("token");
  if (!tokenCookie) return NextResponse.json({}, { status: 403 });
  const decodedToken: JwtPayload | string = jwt.verify(tokenCookie.value, process.env.HASURA_JWT_SECRET_KEY || "");

  if (typeof decodedToken === "string") return NextResponse.json({}, { status: 400 });
  const tokenPayload = decodedToken as JwtPayload;
  const body: PostParams = await request.json();
  const userId = tokenPayload.issuer || "";
  const { videoId, favorited, watched = true} = body;
  const token = tokenCookie.value;
  const doesStatsExist = await findVideoIdByUser(token, userId, videoId);

  const response = doesStatsExist
    ? await updateStats(token, { favorited, userId, watched, videoId })
    : await insertStats(token, { favorited, userId, watched, videoId });

  return NextResponse.json({ msg: "it works", response });
}
