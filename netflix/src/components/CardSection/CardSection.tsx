import styles from "./CardSection.module.css";

import Link from "next/link";
import clsx from "classnames";

import Card from "@/components/Card/Card";
import {Video} from "@/models/Video";

interface Props {
  title: string;
  videos?: Video[];
  size: "small"|"medium"|"large";
  shouldWrap?: boolean;
  shouldScale?: boolean;
}

const CardSection = (props: Props) => {
  const {
    title,
    videos = [],
    size,
    shouldWrap = false,
    shouldScale = true
  } = props;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, idx) => {
          return (
            <Link key={idx} href={`/video/${video.id}`}>
              <Card id={idx} imgUrl={video.imgUrl} size={size} shouldScale={shouldScale} />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CardSection;
