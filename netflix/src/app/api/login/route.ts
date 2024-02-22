import { NextRequest, NextResponse } from 'next/server'
import {magicAdmin} from "@/lib/magic";
import jwt from "jsonwebtoken";
import { createNewUser, isNewUser } from "@/lib/db/hasura";

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
  console.log("issuer: ", metadata.issuer);
  console.log({ jwtToken });
  // Check if user exists
  const isNewUserResponse = await isNewUser(jwtToken, metadata.issuer || "");
  if (isNewUserResponse) {
    const createNewUserMutation = await createNewUser(jwtToken, metadata);
    console.log({ createNewUserMutation });
    return NextResponse.json({ done: true, msg: "is a new user" });
  } else {
    return NextResponse.json({ done: true, msg: "not a new user" });
  }
}
