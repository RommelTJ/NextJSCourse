'use client';

import Image from "next/image";

import styles from "./styles.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card/Card";

import coffeeStores from "../data/coffee-stores.json";

async function getCoffeeStores() {
  // const res = await fetch('https://api.example.com/...');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }
  return coffeeStores;
}

export default async function Home() {
  const coffeeData = await getCoffeeStores();
  console.log("coffee data: ", coffeeData);

  const handleOnBannerBtnClick = () => {
    console.log("Clicked banner button");
  };

  return (
    <main className={`flex min-h-screen flex-col items-center p-24 ${styles.main}`}>
      <Banner buttonText="View stores nearby" handleOnClick={handleOnBannerBtnClick} />
      <div className={styles.heroImage}>
        <Image src="/static/hero-image.png" alt="hero image" width={700} height={400} />
      </div>
      <div className={styles.cardLayout}>
        { coffeeData.map(s => {
          return (
            <Card
              key={s.id}
              name={s.name}
              href={`/coffee-store/${s.id}`}
              imageUrl={s.imgUrl}
              className={styles.card}
            />
          )
        }) }
      </div>
    </main>
  )
}
