import { NextRequest, NextResponse } from 'next/server'
import { FoursquareLocation } from "@/models/FoursquareLocation";
import Airtable from "airtable";


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `${process.env.FOURSQUARE_API_KEY}`
  }
};

const getUrlForCoffeeStores = (query: string, latLong: string, fields: string, limit: string) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&fields=${fields}&limit=${limit}`
}

export async function GET(request: NextRequest): Promise<NextResponse<FoursquareLocation[]>> {
  // Given a request to /home?name=lee, searchParams is { 'name': 'lee' }
  const searchParams: URLSearchParams = request.nextUrl.searchParams;
  const query = "coffee%20shop";
  const fields = "fsq_id%2Cname%2Clocation";
  const latLng = searchParams.get("latLng") || "49.2577841%2C-123.1651891";
  const limit = searchParams.get("limit") || "30";
  const res = await fetch(getUrlForCoffeeStores(query, latLng, fields, limit), options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const jsonData = await res.json();
  const results = jsonData.results as FoursquareLocation[];
  return NextResponse.json(results);
}

Airtable
  .configure({
    apiKey: `${process.env.AIRTABLE_API_KEY}`,
    endpointUrl: 'https://api.airtable.com',
  });
const base = Airtable.base(`${process.env.AIRTABLE_BASE_ID}`);
const table = base('coffee-stores');
interface PostParams {
  fields: {
    ID: string;
    Name: string;
    Address: string;
    Votes: number;
  }
}
export async function POST(request: NextRequest) {
  const body: PostParams = await request.json();

  // Check if the store already exists.
  const existing = await table.select({maxRecords: 1, view: "Grid view", filterByFormula: `{ID} = '${body.fields.ID}'`}).all();
  if (existing.length == 0) {
    // It doesn't, so create it.
    const response = await table.create([body]);
    const fields = response[0].fields;
    return NextResponse.json(fields);
  }
  // It does, so just return it.
  const firstRecord = existing[0];
  const fields = firstRecord.fields;
  return NextResponse.json(fields);
}
