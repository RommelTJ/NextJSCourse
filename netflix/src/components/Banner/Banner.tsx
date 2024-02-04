"use client";

import Image from "next/image";

import styles from "./Banner.module.css";
import {useRouter} from "next/navigation";

interface Props {
  title: string;
  subTitle: string;
  imgUrl: string;
  videoId: string;
}

const Banner = (props: Props) => {
  const { title, subTitle, imgUrl, videoId } = props;
  const router = useRouter();

  const handleOnPlay = () => router.push(`video/${videoId}`);

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>

          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image
                src="/static/play_arrow.svg"
                alt="Play icon"
                width={32}
                height={32}
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl}`,
        }}
      ></div>
    </div>
  );
};

export default Banner;
