import { NextRequest, NextResponse } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken";
import { findVideoIdByUser, updateStats, insertStats } from "@/lib/db/hasura";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";


export const getTokenFromCookie = (tokenCookie?: RequestCookie): { token: string; userId: string; } | undefined => {
  if (tokenCookie) {
    const decodedToken: JwtPayload | string = jwt.verify(tokenCookie.value, process.env.HASURA_JWT_SECRET_KEY || "");
    if (typeof decodedToken === "string") return undefined;
    const tokenPayload = decodedToken as JwtPayload;
    const token = tokenCookie.value;
    const userId = tokenPayload.issuer || "";
    return { token, userId };
  } else {
    return undefined;
  }
}

interface PostParams { videoId: string; favorited: number; watched: boolean; }

export async function POST(request: NextRequest) {
  const body: PostParams = await request.json();
  const { videoId, favorited, watched = true} = body;
  const cookieData = getTokenFromCookie(request.cookies.get("token"));
  if (!cookieData) return NextResponse.json({}, { status: 403 });
  const { token, userId } = cookieData;
  const stats = await findVideoIdByUser(token, userId, videoId);
  const response = stats.length > 0
    ? await updateStats(token, { favorited, userId, watched, videoId })
    : await insertStats(token, { favorited, userId, watched, videoId });

  return NextResponse.json({ data: response });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const videoId = searchParams.get("videoId");
  if (!videoId) return NextResponse.json({}, { status: 400 });
  const cookieData = getTokenFromCookie(request.cookies.get("token"));
  if (!cookieData) return NextResponse.json({}, { status: 403 });
  const { token, userId } = cookieData;
  const data = await findVideoIdByUser(token, userId, videoId);
  if (data.length > 0) return NextResponse.json({data: data[0]});
  else return NextResponse.json({}, { status: 404 });
}
