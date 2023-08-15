"use client";

import { useState } from "react";
import styles from "./UpvoteCard.module.css";
import cls from "classnames";
import Image from "next/image";

interface Props {
  address: string;
  neighborhood: string;
  votes: number;
}

const UpvoteCard = (props: Props) => {
  const { address, neighborhood, votes } = props;
  const [votingCount, setVotingCount] = useState(votes);
  const handleUpvoteClick = () => setVotingCount(votingCount + 1);

  return (
    <div className={cls("glass", styles.col2)}>
      <div className={styles.iconWrapper}>
        <Image src="/static/icons/places.svg" width="24" height="24" alt="place" />
        <p className={styles.text}>{address}</p>
      </div>
      <div className={styles.iconWrapper}>
        <Image src="/static/icons/nearMe.svg" width="24" height="24" alt="neighbourhood" />
        <p className={styles.text}>{neighborhood}</p>
      </div>
      <div className={styles.iconWrapper}>
        <Image src="/static/icons/star.svg" width="24" height="24" alt="stars" />
        <p className={styles.text}>{votingCount}</p>
      </div>

      <button className={styles.upvoteButton} onClick={handleUpvoteClick}>
        Up vote!
      </button>
    </div>
  );
};

export default UpvoteCard;
