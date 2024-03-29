"use client";

import styles from "./Card.module.css";

import { useState } from "react";
import Image from "next/image";
import cls from "classnames";
import { motion } from "framer-motion";

interface Props {
  id: number;
  imgUrl?: string;
  size?: "small"|"medium"|"large";
  shouldScale?: boolean;
}

const IMAGE_DEFAULT = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80";

const Card = (props: Props) => {
  const {
    id,
    imgUrl = IMAGE_DEFAULT,
    size = "medium",
    shouldScale = true
  } = props;
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  const shouldHover = shouldScale && {
    whileHover: { ...scale },
  };

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => setImgSrc(IMAGE_DEFAULT);

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        {...shouldHover}
      >
        <Image
          src={imgSrc}
          alt="image"
          className={styles.cardImg}
          onError={handleOnError}
          fill
          sizes="100vw" />
      </motion.div>
    </div>
  );
};

export default Card;
