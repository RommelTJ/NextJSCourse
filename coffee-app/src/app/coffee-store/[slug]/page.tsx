import { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";

import styles from "./coffee-store.module.css";
import {
  fetchFoursquareCoffeeStores,
  foursquareToCoffeeStore,
  fetchPlacePhotos,
  fetchFoursquareCoffeeStore,
  airtableSync
} from "@/lib/coffee-stores";
import UpvoteCard from "@/components/UpvoteCard/UpvoteCard";

interface Props { params: { slug: string } }

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const foursquareStores = await fetchFoursquareCoffeeStores();
  return foursquareStores.map((loc) => {
    return { slug: `${loc.fsq_id}` };
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const foursquareStore = await fetchFoursquareCoffeeStore(slug);
  return { title: foursquareStore.name };
}

const CoffeeStore = async ({ params }: Props) => {
  const { slug } = params;
  const foursquareStore = await fetchFoursquareCoffeeStore(slug);
  const store = foursquareToCoffeeStore(foursquareStore);
  const photoUrls = await fetchPlacePhotos(slug, 4, "600x360");
  const imgUrl = photoUrls[0];
  const { name, address, neighbourhood, votes } = await airtableSync({...store, imgUrl});

  const otherImageSize = 400;

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">← Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={photoUrls[0] || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <UpvoteCard address={address} neighborhood={neighbourhood || "Unknown"} votes={votes || 0} />

      </div>

      <div className="container mx-auto flex flex-wrap content-center">
        <div className="flex-1">
          <div className="mx-auto justify-center" style={{width: otherImageSize}}>
            <Image
              src={photoUrls[1] || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
              width={otherImageSize}
              height={otherImageSize}
              className={styles.storeImg}
              alt={name}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="mx-auto justify-center" style={{width: otherImageSize}}>
            <Image
              src={photoUrls[2] || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
              width={otherImageSize}
              height={otherImageSize}
              className={styles.storeImg}
              alt={name}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="mx-auto justify-center" style={{width: otherImageSize}}>
            <Image
              src={photoUrls[3] || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
              width={otherImageSize}
              height={otherImageSize}
              className={styles.storeImg}
              alt={name}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export default CoffeeStore;
