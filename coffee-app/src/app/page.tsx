'use client';

import Image from "next/image";

import styles from "./styles.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card/Card";

export default function Home() {

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
        <Card name="DarkHorse Coffee 1" href="/coffee-store/darkhorse-coffee-1" imageUrl="/static/hero-image.png" className={styles.card} />
        <Card name="DarkHorse Coffee 2" href="/coffee-store/darkhorse-coffee-2" imageUrl="/static/hero-image.png" className={styles.card} />
        <Card name="DarkHorse Coffee 3" href="/coffee-store/darkhorse-coffee-3" imageUrl="/static/hero-image.png" className={styles.card} />
        <Card name="DarkHorse Coffee 4" href="/coffee-store/darkhorse-coffee-4" imageUrl="/static/hero-image.png" className={styles.card} />
      </div>
    </main>
  )
}
