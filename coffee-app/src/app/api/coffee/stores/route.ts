import { NextRequest, NextResponse } from 'next/server'
import { FoursquareLocation } from "@/models/FoursquareLocation";
import {table} from "@/lib/airtable";


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

interface PostParams {
  fields: {
    ID: string;
    Name: string;
    Address: string;
    Votes: number;
    Image: string;
  }
}

interface UpdateParams extends PostParams{
  id: string;
}

export async function POST(request: NextRequest) {
  const body: PostParams = await request.json();

  if (body.fields.ID && body.fields.Name) {
    // Check if the store already exists.
    const existing = await table.select({maxRecords: 1, view: "Grid view", filterByFormula: `{ID} = '${body.fields.ID}'`}).all();
    if (existing.length == 0) {
      // It doesn't, so create it.
      const response = await table.create([body]);
      const fields = response[0].fields;
      const airtableID = response[0].id;
      return NextResponse.json({...fields, airtableID});
    }
    // It does, so update it.
    const airtableID = existing[0].id;
    // @ts-ignore
    const existingFields = (existing[0] as PostParams).fields;
    const existingVotes: number = existingFields.Votes || 0;
    const newVotes = body.fields.Votes == 0
      ? existingVotes
      : existingVotes >= body.fields.Votes ? body.fields.Votes + (existingVotes - body.fields.Votes + 1) : body.fields.Votes;
    const update: UpdateParams[] = [{ id: airtableID, fields: {...existingFields, Votes: newVotes} }];
    const response = await table.update(update);
    const fields = response[0].fields;
    return NextResponse.json({...fields, airtableID});
  } else {
    return NextResponse.json({ error: 'ID or Name is missing' }, { status: 500 });
  }
}
