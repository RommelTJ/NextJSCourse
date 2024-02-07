"use client";

import styles from "./Video.module.css";
import Modal from "react-modal";
import {useRouter} from "next/navigation";
import clsx from "classnames";
import {getYoutubeVideoById} from "@/lib/videos";
import {Video} from "@/models/Video";


// i.e. getStaticProps
async function getVideo(): Promise<Video|undefined> {
  const videoId = "4zH5iYM4wJo";
  const videoArray = await getYoutubeVideoById(videoId);
  return videoArray.length ? videoArray[0] : undefined;
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
  const title = video?.title;
  const publishTime = video?.publishedAt;
  const description = video?.description;
  const channelTitle = video?.channelTitle;
  const viewCount = video?.statistics?.viewCount || 0;

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
