import {FoursquareLocation} from "@/models/FoursquareLocation";
import {CoffeeStore} from "@/models/CoffeeStore";
import {FoursquarePhoto} from "@/models/FoursquarePhoto";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `${process.env.FOURSQUARE_API_KEY}`
  }
};

const getUrlForCoffeeStores = (query: string, latLong: string, fields: string, limit: number) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&fields=${fields}&limit=${limit}`
}

export const fetchFoursquareCoffeeStore = async (id: string) => {
  const res = await fetch(`https://api.foursquare.com/v3/places/${id}`, options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return await res.json() as FoursquareLocation;
};

export const fetchFoursquareCoffeeStores = async (
  latLng: string = "49.2577841%2C-123.1651891",
  limit: number = 6
  ) => {
  const query = "coffee%20shop";
  const fields = "fsq_id%2Cname%2Clocation";
  const res = await fetch(getUrlForCoffeeStores(query, latLng, fields, limit), options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const jsonData = await res.json();
  return jsonData.results as FoursquareLocation[];
};

export const fetchPlacePhotos = async (id: string, limit: number, resolution: string = "original") => {
  const res = await fetch(`https://api.foursquare.com/v3/places/${id}/photos?limit=${limit}`, options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const jsonData = await res.json();
  const photos = jsonData as FoursquarePhoto[];
  return photos.map(p => assemblePhotoUrl(p, resolution));
}

const assemblePhotoUrl = (photo: FoursquarePhoto, resolution: string): string => `${photo.prefix}${resolution}${photo.suffix}`;

export const foursquareToCoffeeStore = (loc: FoursquareLocation): CoffeeStore => {
  return {
    id: loc.fsq_id,
    name: loc.name,
    address: loc.location.address,
    neighbourhood: loc.location.cross_street
  };
};

export const airtableSync = async (coffeeStore: CoffeeStore) => {
  const payload = {
    fields: {
      ID: coffeeStore.id,
      Name: coffeeStore.name,
      Address: coffeeStore.address,
      Votes: coffeeStore.votes || 0,
      Image: coffeeStore.imgUrl || ""
    }
  };
  const airtableRequest = await fetch("http://localhost:3000/api/coffee/stores/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const airtableResponse = await airtableRequest.json();
  const updatedCoffeeStore: CoffeeStore = {...coffeeStore, votes: airtableResponse.Votes, airtableID: airtableResponse.airtableID};
  return updatedCoffeeStore;
}
