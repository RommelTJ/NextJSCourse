import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const auth = request.headers.get('Authorization');
  if (!auth) {
    return NextResponse.json({ done: false });
  }
  const didToken = auth.substring(7);
  console.log("didToken", didToken);
  return NextResponse.json({ done: true });
}
