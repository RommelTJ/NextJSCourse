"use client";

import styles from "./Video.module.css";
import Modal from "react-modal";
import {useRouter} from "next/navigation";
import clsx from "classnames";

export type YoutubeVideo = {
  title: string;
  publishTime: string;
  description: string;
  channelTitle: string;
  viewCount: number;
}

// i.e. getStaticProps
async function getVideo(): Promise<YoutubeVideo> {
  // TODO: Fetch this from the YouTube API
  const video: YoutubeVideo = {
    title: "Hi cute dog",
    publishTime: "1990-01-01",
    description:
      "A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger?",
    channelTitle: "Paramount Pictures",
    viewCount: 10000,
  };

  // revalidate does Incremental Static Regeneration (ISR)
  // const res = await fetch(`https://.../posts`, { next: { revalidate: 60 } })
  // const data = await res.json()
  // return data.posts

  return Promise.resolve(video)
}

// true: (default) Dynamic segments not included in generateStaticParams are generated on demand.
// false: Dynamic segments not included in generateStaticParams will return a 404.
export const dynamicParams = true;
export async function generateStaticParams() {
  return [{ videoId: 'mYfJxlgR2jw' }, { videoId: '4zH5iYM4wJo' }, { videoId: "KCPEHsAViiQ" }]
}

const Video = async ({ params }: { params: { videoId: string } }) => {
  const router = useRouter();
  const video = await getVideo();
  const { title, publishTime, description, channelTitle, viewCount } = video;

  return (
    <div>
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          className={styles.videoPlayer}
          id="ytplayer"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${params.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder={0}
        ></iframe>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
