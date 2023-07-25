import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest) {
  const data = { hello: "more specific" };
  return NextResponse.json(data);
}
