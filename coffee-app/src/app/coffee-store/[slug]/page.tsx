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

const CoffeeStore = ({ params }: Props) => {
  const { slug } = params;
  const store: CoffeeStore = coffeeStoreData.find(s => s.id == Number(slug)) || {id: -1, name: "unknown", address: "unknown"};
  const { name, address } = store;
  return (
    <div>
      <h1>Coffee Store Page {slug}</h1>
      <div><Link href="/">Back to Home</Link></div>
      <div><Link href={`/coffee-store/2324tsg`}>Go to dynamic</Link></div>
      <div>
        <p>Name: {name}</p>
        <p>Address: {address}</p>
      </div>
    </div>
  )
};

export default CoffeeStore;
