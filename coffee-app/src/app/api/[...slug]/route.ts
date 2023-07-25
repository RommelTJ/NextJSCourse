import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest) {
  const data = { hello: "catch-all segments" };
  return NextResponse.json(data);
}
