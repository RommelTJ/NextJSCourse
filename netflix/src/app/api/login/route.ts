import { NextRequest, NextResponse } from 'next/server'
import {magicAdmin} from "@/lib/magic";

export async function POST(request: NextRequest) {
  const auth = request.headers.get('Authorization');
  if (!auth) {
    return NextResponse.json({ done: false });
  }
  const didToken = auth.substring(7); // Bearer token
  console.log("didToken", didToken);

  const metadata = await magicAdmin.users.getMetadataByToken(didToken);
  console.log({ metadata });

  return NextResponse.json({ done: true });
}
