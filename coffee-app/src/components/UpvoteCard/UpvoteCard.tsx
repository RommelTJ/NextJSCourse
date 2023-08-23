"use client";

import { useState, useEffect } from "react";
import cls from "classnames";
import Image from "next/image";
import useSWR from "swr";

import styles from "./UpvoteCard.module.css";
import { airtableSync } from "@/lib/coffee-stores";
import { CoffeeStore } from "@/models/CoffeeStore";

const fetcher = (path: string) => fetch(path).then(res => res.json());

interface Props { store: CoffeeStore }

const UpvoteCard = (props: Props) => {
  const { address, neighbourhood, votes } = props.store;
  const [airtableID, setAirtableID] = useState<string|undefined>();
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_HOST}/api/coffee/stores/${airtableID}`, fetcher);

  useEffect(() => {
    airtableSync(props.store)
      .then(syncedStore => {
        setAirtableID(syncedStore.airtableID);
        setVotingCount(syncedStore.votes || 0);
      });
  }, []);

  useEffect(() => {
    if (data) {
      const votes: number = data.Votes;
      setVotingCount(votes);
    }
  }, [data]);

  const [votingCount, setVotingCount] = useState(votes || 0);
  const handleUpvoteClick = () => {
    const newCount = votingCount + 1;
    airtableSync({...props.store, votes: newCount})
      .then(syncedStore => setVotingCount(syncedStore.votes || 0));
  };

  return (
    <div className={cls("glass", styles.col2)}>
      <div className={styles.iconWrapper}>
        <Image src="/static/icons/places.svg" width="24" height="24" alt="place" />
        <p className={styles.text}>{address}</p>
      </div>
      <div className={styles.iconWrapper}>
        <Image src="/static/icons/nearMe.svg" width="24" height="24" alt="neighbourhood" />
        <p className={styles.text}>{neighbourhood || "Unknown"}</p>
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
