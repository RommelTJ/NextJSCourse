import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest) {
  const data = { hello: "world" };
  return NextResponse.json(data);
}

interface PostParams { breed: string; }
export async function POST(request: NextRequest) {
  const body: PostParams = await request.json();
  const { breed } = body;
  const data = { message: `I love ${breed}` };
  return NextResponse.json(data);
}
