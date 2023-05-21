'use client';
import styles from "./styles.module.css";
import Banner from "@/components/Banner";

export default function Home() {

  const handleOnBannerBtnClick = () => {
    console.log("Clicked banner button");
  };

  return (
    <main className={`flex min-h-screen flex-col items-center p-24 ${styles.main}`}>
      <Banner buttonText="View stores nearby" handleOnClick={handleOnBannerBtnClick} />
    </main>
  )
}
