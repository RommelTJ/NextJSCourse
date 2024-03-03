import type { Metadata } from 'next';

import NavBar from "@/components/NavBar/NavBar";
import CardSection from "@/components/CardSection/CardSection";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: 'My List',
  description: 'My favorite videos',
}

const MyList = () => {
  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.sectionWrapper}>
        <CardSection title="My List" size="small" videos={[]} />
      </div>
    </main>
  );
}

export default MyList;
