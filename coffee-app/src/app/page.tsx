import Image from "next/image";

import styles from "./styles.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card/Card";

export type CoffeeStore = {
  id: number;
  name: string;
  imgUrl?: string;
  websiteUrl?: string;
  address: string;
  neighbourhood?: string;
};

async function getCoffeeStores() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'REDACTED'
    }
  };

  const res = await fetch('https://api.foursquare.com/v3/places/search?query=coffee%20shop&ll=32.7067015%2C-117.13199&fields=fsq_id%2Cname%2Clocation&limit=9', options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const jsonData = await res.json();
  const results = jsonData.results;
  // TODO: Add a FourSquare place object
  return results.map((r: any) => {
    return {
      id: r.fsq_id,
      name: r.name,
      address: r.address,
      neighbourhood: r.cross_street
    };
  });
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
            { stores.map(s => {
              return (
                <Card
                  key={s.id}
                  name={s.name}
                  href={`/coffee-store/${s.id}`}
                  imageUrl={s.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
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
