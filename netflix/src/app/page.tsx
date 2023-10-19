import styles from "./page.module.css";
import NavBar from "@/components/NavBar/NavBar";
import Banner from "@/components/Banner/Banner";
import CardSection from "@/components/CardSection/CardSection";
import {getPopularVideos, getVideos} from "@/lib/videos";
import { Video } from "@/models/Video";
import LoginRouter from "@/components/LoginRouter/LoginRouter";

const Home = async () => {
  const disneyVideos: Video[] = await getVideos("Disney Trailer");
  const productivityVideos: Video[] = await getVideos("Productivity");
  const travelVideos: Video[] = await getVideos("Travel");
  const popularVideos: Video[] = await getPopularVideos();

  return (
    <LoginRouter
      child={
      <div>
        <NavBar />
        <Banner
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
        />

        <div className={styles.sectionWrapper}>
          <CardSection title="Disney" videos={disneyVideos} size="large" />
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
