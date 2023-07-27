import { NextRequest, NextResponse } from 'next/server'
import { FoursquareLocation } from "@/models/FoursquareLocation";


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