"use client";

import styles from "./Card.module.css";

import Image from "next/image";

interface Props {
  imgUrl: string;
  size: "small"|"medium"|"large";
}

const Card = (props: Props) => {
  const { imgUrl, size } = props;

  const width = size == "small" ? 300 : size == "medium" ? 300 : 300;
  const height = size == "small" ? 300 : size == "medium" ? 300 : 300;

  return (
    <div>
      <Image src={imgUrl} alt="image" width={width} height={height} />
    </div>
  );
};

export default Card;
