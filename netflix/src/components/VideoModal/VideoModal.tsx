"use client";

import styles from "./VideoModal.module.css";

import { useState } from "react";
import {useRouter} from "next/navigation";
import clsx from "classnames";
import Modal from "react-modal";

import {Video} from "@/models/Video";
import LikeIcon from "@/components/icons/LikeIcon/LikeIcon";
import DislikeIcon from "@/components/icons/DislikeIcon/DislikeIcon";

interface Props { video?: Video }

const VideoModal = (props: Props) => {
  const router = useRouter();
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDisLike, setToggleDisLike] = useState(false);
  const { video } = props;

  const handleToggleDislike = async () => {
    setToggleDisLike(!toggleDisLike);
    setToggleLike(toggleDisLike);
    if (video?.id) await updateStats(video.id, !toggleDisLike ? 0 : 1);
  };

  const handleToggleLike = async () => {
    setToggleLike(!toggleLike);
    setToggleDisLike(toggleLike);
    if (video?.id) await updateStats(video.id, !toggleLike ? 1 : 0);
  };

  const updateStats = async (videoId: string, favorited: number) => {
    return await fetch("/api/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoId, favorited })
    });
  }

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
          <button onClick={handleToggleLike}>
            <div className={styles.btnWrapper}>
              <LikeIcon selected={toggleLike} />
            </div>
          </button>
        </div>
        <button onClick={handleToggleDislike}>
          <div className={styles.btnWrapper}>
            <DislikeIcon selected={toggleDisLike} />
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
