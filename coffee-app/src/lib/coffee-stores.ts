import {FoursquareLocation} from "@/models/FoursquareLocation";
import {CoffeeStore} from "@/models/CoffeeStore";

const getUrlForCoffeeStores = (query: string, latLong: string, fields: string, limit: number) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&fields=${fields}&limit=${limit}`
}

export const fetchFoursquareCoffeeStores = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${process.env.FOURSQUARE_API_KEY}`
    }
  };

  const query = "coffee%20shop";
  const latLong = "32.7067015%2C-117.13199";
  const fields = "fsq_id%2Cname%2Clocation";
  const limit = 9;
  const res = await fetch(getUrlForCoffeeStores(query, latLong, fields, limit), options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const jsonData = await res.json();
  return jsonData.results as FoursquareLocation[];
};

export const foursquareToCoffeeStore = (loc: FoursquareLocation): CoffeeStore => {
  return {
    id: loc.fsq_id,
    name: loc.name,
    address: loc.location.address,
    neighbourhood: loc.location.cross_street
  };
};
