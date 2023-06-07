import { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import cls from "classnames";

import styles from "./coffee-store.module.css";
import { fetchFoursquareCoffeeStores, foursquareToCoffeeStore } from "@/lib/coffee-stores";

interface Props { params: { slug: string } }

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const foursquareStores = await fetchFoursquareCoffeeStores();
  return foursquareStores.map((loc) => {
    return { slug: `${loc.fsq_id}` };
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const foursquareStores = await fetchFoursquareCoffeeStores();
  const foursquareStore = foursquareStores.find(s => s.fsq_id == slug)!;
  return { title: foursquareStore.name };
}

const CoffeeStore = async ({ params }: Props) => {
  const { slug } = params;
  const foursquareStores = await fetchFoursquareCoffeeStores();
  const foursquareStore = foursquareStores.find(s => s.fsq_id == slug)!
  const store = foursquareToCoffeeStore(foursquareStore);
  const { name, address, neighbourhood, imgUrl } = store;

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
            src={imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
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
