import { cookies } from 'next/headers'

import styles from "./page.module.css";
import NavBar from "@/components/NavBar/NavBar";
import Banner from "@/components/Banner/Banner";
import CardSection from "@/components/CardSection/CardSection";
import { getPopularVideos, getVideos, getWatchItAgainVideos } from "@/lib/videos";
import { Video } from "@/models/Video";
import LoginRouter from "@/components/LoginRouter/LoginRouter";
import { getTokenFromCookie } from "@/app/api/stats/route";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {router} from "next/client";


async function getWatchItAgainVideosData() {
  const cookie: RequestCookie | undefined = cookies().get('token');
  const cookieData = getTokenFromCookie(cookie);
  if (!cookieData) return [];
  const { token, userId } = cookieData;
  return await getWatchItAgainVideos(userId, token);
}

const Home = async () => {
  const disneyVideos: Video[] = await getVideos("Disney Trailer");
  const productivityVideos: Video[] = await getVideos("Productivity");
  const travelVideos: Video[] = await getVideos("Travel");
  const popularVideos: Video[] = await getPopularVideos();
  const watchItAgainVideos: Video[] = await getWatchItAgainVideosData()

  return (
    <LoginRouter
      child={
      <div>
        <NavBar />
        <Banner
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
          videoId="4zH5iYM4wJo"
        />

        <div className={styles.sectionWrapper}>
          <CardSection title="Disney" videos={disneyVideos} size="large" />
          <CardSection title="Watch it again" videos={watchItAgainVideos} size="small" />
          <CardSection title="Travel" videos={travelVideos} size="small" />
          <CardSection title="Productivity" videos={productivityVideos} size="medium" />
          <CardSection title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
      }
    />
  )
}

export default Home;
