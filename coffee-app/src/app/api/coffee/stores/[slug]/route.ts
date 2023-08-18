import { NextRequest, NextResponse } from 'next/server'
import { table } from "@/lib/airtable";

export async function GET(request: NextRequest) {
  const coffeeStoreId = request.nextUrl.pathname.split("/api/coffee/stores/")[1];
  const response = await table.find(coffeeStoreId);
  const firstRecord = response.fields;
  return NextResponse.json(firstRecord);
}
