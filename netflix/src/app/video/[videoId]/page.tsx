"use client";

import styles from "./Video.module.css";
import Modal from "react-modal";
import {useRouter} from "next/navigation";

const Video = ({ params }: { params: { videoId: string } }) => {
  const router = useRouter();
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
          id="ytplayer"
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${params.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        ></iframe>
      </Modal>
    </div>
  );
};

export default Video;
