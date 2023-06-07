export type FoursquareLocation = {
  fsq_id: string;
  name: string;
  location: {
    address: string;
    census_block: string;
    country: string;
    cross_street: string;
    dma: string;
    formatted_address: string;
    locality: string;
    postcode: string;
    region: string;
  }
};
