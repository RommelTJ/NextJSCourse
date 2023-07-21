import Image from "next/image";

import styles from "./styles.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card/Card";
import { CoffeeStore } from "@/models/CoffeeStore";
import { FoursquareLocation } from "@/models/FoursquareLocation";
import { fetchFoursquareCoffeeStores, foursquareToCoffeeStore, fetchPlacePhotos } from "@/lib/coffee-stores";

async function getCoffeeStores(latLng?: string): Promise<CoffeeStore[]> {
  const limit = latLng ? 30 : 9;
  const foursquareLocations = await fetchFoursquareCoffeeStores(latLng, limit);
  const stores = foursquareLocations.map((loc: FoursquareLocation) => foursquareToCoffeeStore(loc));
  return addPhotoToStores(stores);
}

async function addPhotoToStores(stores: CoffeeStore[]): Promise<CoffeeStore[]> {
  const updatedStores: CoffeeStore[] = [];
  for (const store of stores) {
    const photos = await getPhotoForStore(store.id);
    const updatedStore = { ...store, imgUrl: photos[0] };
    updatedStores.push(updatedStore);
  }
  return updatedStores;
}

async function getPhotoForStore(id: string){
  return await fetchPlacePhotos(id, 1, "260x160");
}

interface Props { params?: { slug: string }, searchParams?: { latLng: string } }

export default async function Home(props: Props) {
  const latLng = props.searchParams?.latLng;
  const stores: CoffeeStore[] = await getCoffeeStores(latLng);

  return (
    <main className={`flex min-h-screen flex-col items-center p-24 ${styles.main}`}>
      <Banner />
      <div className={styles.heroImage}>
        <Image src="/static/hero-image.png" alt="hero image" width={700} height={400} />
      </div>
      { stores.length > 0 && (
        <div>
          <h2 className={styles.heading2}>{latLng ? "Stores near me" : "Vancouver Shops"}</h2>
          <div className={styles.cardLayout}>
            {
              stores.map((s) => {
                return (
                  <Card
                    key={s.id}
                    name={s.name}
                    href={`/coffee-store/${s.id}`}
                    imageUrl={s.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                    className={styles.card}
                  />
                )
              })
            }
          </div>
        </div>
      )}
    </main>
  )
}
