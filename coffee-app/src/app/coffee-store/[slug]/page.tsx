import { Metadata } from 'next';
import Link from "next/link";

import coffeeStoreData from "../../../data/coffee-stores.json";
import { CoffeeStore } from "../../page";

interface Props { params: { slug: string } }

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const stores = coffeeStoreData;
  return stores.map((store) => {
    return { slug: `${store.id}` };
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const store: CoffeeStore = coffeeStoreData.find(s => s.id == Number(slug))!;
  return { title: store.name };
}

const CoffeeStore = ({ params }: Props) => {
  const { slug } = params;
  const store: CoffeeStore = coffeeStoreData.find(s => s.id == Number(slug))!;
  const { name, address, neighbourhood } = store;
  return (
    <div>
      <div><Link href="/">Back to Home</Link></div>
      <h1>{name}</h1>
      <p>{address}</p>
      <p>{neighbourhood}</p>
    </div>
  )
};

export default CoffeeStore;
