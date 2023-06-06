import { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import cls from "classnames";

import coffeeStoreData from "../../../data/coffee-stores.json";
import { CoffeeStore } from "../../page";
import styles from "./coffee-store.module.css";

interface Props { params: { slug: string } }

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const stores = coffeeStoreData;
  return stores.map((store) => {
    return { slug: `${store.id}` };
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const store: CoffeeStore = coffeeStoreData.find(s => s.id == Number(slug))!;
  return { title: store.name };
}

const CoffeeStore = ({ params }: Props) => {
  const { slug } = params;
  const store: CoffeeStore = coffeeStoreData.find(s => s.id == Number(slug))!;
  const { name, address, neighbourhood, imgUrl } = store;

  const handleUpvoteButton = () => {};

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width="24" height="24" alt="place" />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width="24" height="24" alt="neighbourhood" />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" alt="stars" />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  )
};

export default CoffeeStore;
