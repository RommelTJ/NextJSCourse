import styles from "./page.module.css";

import type { Metadata } from 'next';
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

import NavBar from "@/components/NavBar/NavBar";
import CardSection from "@/components/CardSection/CardSection";
import { getMyList } from "@/lib/videos";
import { getTokenFromCookie } from "@/app/api/stats/route";


export const metadata: Metadata = {
  title: 'My List',
  description: 'My favorite videos',
}

const MyList = async () => {
  const cookie: RequestCookie | undefined = cookies().get('token');
  const cookieData = getTokenFromCookie(cookie);
  const userId = cookieData?.userId || "";
  const token = cookieData?.token || "";
  const myListVideos = await getMyList(userId, token);

  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.sectionWrapper}>
        <CardSection title="My List" size="small" videos={myListVideos} shouldWrap shouldScale={false} />
      </div>
    </main>
  );
}

export default MyList;
