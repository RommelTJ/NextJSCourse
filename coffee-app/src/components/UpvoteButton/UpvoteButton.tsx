"use client";

import styles from "./UpvoteButton.module.css";

const UpvoteButton = () => {
  const handleUpvoteClick = () => {
    console.log("Upvote!");
  }

  return (
    <button className={styles.upvoteButton} onClick={handleUpvoteClick}>
      Up vote!
    </button>
  );
};

export default UpvoteButton;
