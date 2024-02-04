import styles from "./CardSection.module.css";
import Link from "next/link";
import Card from "@/components/Card/Card";
import {Video} from "@/models/Video";

interface Props {
  title: string;
  videos?: Video[];
  size: "small"|"medium"|"large";
}

const CardSection = (props: Props) => {
  const { title, videos = [], size } = props;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => {
          return <Link key={idx} href={`/video/${video.id}`}><Card id={idx} imgUrl={video.imgUrl} size={size} /></Link>;
        })}
      </div>
    </section>
  );
};

export default CardSection;
