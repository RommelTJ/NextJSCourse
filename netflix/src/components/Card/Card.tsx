"use client";

import styles from "./Card.module.css";

import { useState } from "react";
import Image from "next/image";

interface Props {
  imgUrl: string;
  size: "small"|"medium"|"large";
}

const Card = (props: Props) => {
  const { imgUrl = "/static/clifford.webp", size = "medium" } = props;
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => setImgSrc("/static/clifford.webp");

  return (
    <div className={styles.container}>
      <div className={classMap[size]}>
        <Image
          src={imgSrc}
          alt="image"
          layout="fill"
          className={styles.cardImg}
          onError={handleOnError}
        />
      </div>
    </div>
  );
};

export default Card;
