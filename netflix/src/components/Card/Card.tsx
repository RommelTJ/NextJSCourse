"use client";

import styles from "./Card.module.css";

import Image from "next/image";

interface Props {
  imgUrl: string;
  size: "small"|"medium"|"large";
}

const Card = (props: Props) => {
  const { imgUrl, size } = props;

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  return (
    <div className={styles.container}>
      <div className={classMap[size]}>
        <Image
          src={imgUrl}
          alt="image"
          layout="fill"
          className={styles.cardImg}
        />
      </div>
    </div>
  );
};

export default Card;
