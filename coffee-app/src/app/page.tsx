'use client';

import Image from "next/image";

import styles from "./styles.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card/Card";

import coffeeStoreData from "../data/coffee-stores.json";
import {useEffect, useState} from "react";

export type CoffeeStore = {
  id: number;
  name: string;
  imgUrl?: string;
  websiteUrl?: string;
  address: string;
  neighbourhood?: string;
};

function getCoffeeStores(): CoffeeStore[] {
  // const res = await fetch('https://api.example.com/...');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }
  return coffeeStoreData;
}


export default function Home() {
  const [stores, setStores] = useState<CoffeeStore[]>([]);

  useEffect(() => {
    if (stores.length == 0) setStores(getCoffeeStores());
  }, []);

  const handleOnBannerBtnClick = () => {
    console.log("Clicked banner button");
  };

  return (
    <main className={`flex min-h-screen flex-col items-center p-24 ${styles.main}`}>
      <Banner buttonText="View stores nearby" handleOnClick={handleOnBannerBtnClick} />
      <div className={styles.heroImage}>
        <Image src="/static/hero-image.png" alt="hero image" width={700} height={400} />
      </div>
      { stores.length > 0 && (
        <div>
          <h2 className={styles.heading2}>Toronto Stores</h2>
          <div className={styles.cardLayout}>
            { stores.map(s => {
              return (
                <Card
                  key={s.id}
                  name={s.name}
                  href={`/coffee-store/${s.id}`}
                  imageUrl={s.imgUrl || ""}
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
