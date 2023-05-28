import styles from "./Card.module.css";

import cls from "classnames";
import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string;
  imageUrl: string;
  href: string;
}

const Card = (props: Props) => {
  const { name, imageUrl, href } = props;

  return (
    <Link href={href} className={styles.cardLink}>
      <div className={cls("glass", styles.container)}>
        <div className={styles.cardHeaderWrapper}><h2 className={styles.cardHeader}>{name}</h2></div>
        <div className={styles.cardImageWrapper}>
          <Image className={styles.cardImage} src={imageUrl} alt="Image" width={260} height={160} />
        </div>
      </div>
    </Link>
  );
};

export default Card;
