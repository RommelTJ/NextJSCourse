"use client";
import styles from "./banner.module.css";
import useTrackLocation from "@/hooks/useTrackLocation";

const Banner = () => {
  const { latLong, handleTrackLocation, locationErrorMsg, isFindingLocation } = useTrackLocation();

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
