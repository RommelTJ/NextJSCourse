import { NextRequest, NextResponse } from 'next/server'
import {magicAdmin} from "@/lib/magic";
import jwt from "jsonwebtoken";
import { createNewUser, isNewUser } from "@/lib/db/hasura";
import { setTokenCookie } from "@/lib/cookies";


export async function POST(request: NextRequest) {
  const auth = request.headers.get('Authorization');
  if (!auth) {
    return NextResponse.json({ done: false });
  }
  const didToken = auth.substring(7); // Bearer token
  const metadata = await magicAdmin.users.getMetadataByToken(didToken);
  const jwtToken = jwt.sign(
    {
      ...metadata,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user", "admin"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": `${metadata.issuer}`,
      },
    },
    process.env.HASURA_JWT_SECRET_KEY || "",
  );
  const isNewUserResponse = await isNewUser(jwtToken, metadata.issuer || "");
  if (isNewUserResponse) await createNewUser(jwtToken, metadata);
  const resp = NextResponse.json({ done: true });
  resp.cookies.set(setTokenCookie(jwtToken));
  return resp;
}
