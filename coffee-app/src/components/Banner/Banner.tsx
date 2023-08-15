"use client";

import styles from "./Banner.module.css";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useTrackLocation from "@/hooks/useTrackLocation";

const Banner = () => {
  const router = useRouter();
  const { latLng, handleTrackLocation, locationErrorMsg, isFindingLocation } = useTrackLocation();

  useEffect(() => {
    if (latLng) {
      router.push(`/?latLng=${latLng}`);
    }
  }, [latLng]);

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subTitle}>Discover your local coffee shops</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleOnBannerBtnClick}>
          {isFindingLocation ? "Locating..." : "View stores nearby"}
        </button>
      </div>
      { locationErrorMsg && <div>Something went wrong. Unable to retrieve your location.</div>}
    </div>
  );
};

export default Banner;
