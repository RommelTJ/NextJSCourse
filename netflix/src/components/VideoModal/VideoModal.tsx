"use client";

import styles from "./VideoModal.module.css";

import {useRouter} from "next/navigation";
import clsx from "classnames";
import Modal from "react-modal";

import {Video} from "@/models/Video";
import LikeIcon from "@/components/icons/LikeIcon/LikeIcon";
import DislikeIcon from "@/components/icons/DislikeIcon/DislikeIcon";

interface Props { video?: Video }

const VideoModal = (props: Props) => {
  const router = useRouter();
  const { video } = props;

  if (!video) return null;
  return (
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
        src={`https://www.youtube.com/embed/${video.id}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
        frameBorder={0}
      ></iframe>

      <div className={styles.likeDislikeBtnWrapper}>
        <div className={styles.likeBtnWrapper}>
          <button>
            <div className={styles.btnWrapper}>
              <LikeIcon />
            </div>
          </button>
        </div>
        <button>
          <div className={styles.btnWrapper}>
            <DislikeIcon />
          </div>
        </button>
      </div>

      <div className={styles.modalBody}>
        <div className={styles.modalBodyContent}>
          <div className={styles.col1}>
            <p className={styles.publishTime}>{video.publishedAt}</p>
            <p className={styles.title}>{video.title}</p>
            <p className={styles.description}>{video.description}</p>
          </div>
          <div className={styles.col2}>
            <p className={clsx(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>Cast: </span>
              <span className={styles.channelTitle}>{video.channelTitle}</span>
            </p>
            <p className={clsx(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>View Count: </span>
              <span className={styles.channelTitle}>{video.statistics?.viewCount || 0}</span>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default VideoModal;
