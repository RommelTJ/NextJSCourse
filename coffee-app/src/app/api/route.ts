import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest) {
  const data = { hello: "world" };
  return NextResponse.json(data);
}
