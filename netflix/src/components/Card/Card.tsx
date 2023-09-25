"use client";

import styles from "./Card.module.css";

import { useState } from "react";
import Image from "next/image";
import cls from "classnames";
import { motion } from "framer-motion";

interface Props {
  imgUrl?: string;
  size?: "small"|"medium"|"large";
}

const IMAGE_DEFAULT = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80";

const Card = (props: Props) => {
  const { imgUrl = IMAGE_DEFAULT, size = "medium" } = props;
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => setImgSrc(IMAGE_DEFAULT);

  return (
    <div className={styles.container}>
      <motion.div className={cls(styles.imgMotionWrapper, classMap[size])} whileHover={{ scale: 1.2 }}>
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
