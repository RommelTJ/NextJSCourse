"use client";

import styles from "./Video.module.css";
import Modal from "react-modal";
import {useRouter} from "next/navigation";

const Video = ({ params }: { params: { videoId: string } }) => {
  const router = useRouter();
  return (
    <div>
      video page: {params.videoId}
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
      >
        <div>Modal body</div>
      </Modal>
    </div>
  );
};

export default Video;
