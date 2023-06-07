import Image from "next/image";

import styles from "./styles.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card/Card";
import { CoffeeStore } from "@/models/CoffeeStore";
import { FoursquareLocation } from "@/models/FoursquareLocation";
import { fetchFoursquareCoffeeStores, foursquareToCoffeeStore, fetchPlacePhotos } from "@/lib/coffee-stores";

async function getCoffeeStores() {
  const foursquareLocations = await fetchFoursquareCoffeeStores();
  return foursquareLocations.map((loc: FoursquareLocation) => foursquareToCoffeeStore(loc));
}

async function getPhotoForStore(id: string){
  return await fetchPlacePhotos(id, 1, "260x160");
}

export default async function Home() {
  const stores: CoffeeStore[] = await getCoffeeStores();

  return (
    <main className={`flex min-h-screen flex-col items-center p-24 ${styles.main}`}>
      <Banner buttonText="View stores nearby" />
      <div className={styles.heroImage}>
        <Image src="/static/hero-image.png" alt="hero image" width={700} height={400} />
      </div>
      { stores.length > 0 && (
        <div>
          <h2 className={styles.heading2}>San Diego Coffee Shops</h2>
          <div className={styles.cardLayout}>
            { stores.map(async (s) => {
              const imageUrls = await getPhotoForStore(s.id);
              return (
                <Card
                  key={s.id}
                  name={s.name}
                  href={`/coffee-store/${s.id}`}
                  imageUrl={imageUrls[0] || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                  className={styles.card}
                />
              )
            }) }
          </div>
        </div>
      )}
    </main>
  )
}
