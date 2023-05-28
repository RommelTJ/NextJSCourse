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
      <Card name="DarkHorse Coffee" href="/coffee-store/darkhorse-coffee" imageUrl="/static/hero-image.png" />
    </main>
  )
}
