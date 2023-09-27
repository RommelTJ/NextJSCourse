import styles from "./page.module.css";
import NavBar from "@/components/NavBar/NavBar";
import Banner from "@/components/Banner/Banner";
import CardSection from "@/components/CardSection/CardSection";

export default function Home() {
  return (
    <div>
      <NavBar username="me@rommelrico.com" />
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />

      <div className={styles.sectionWrapper}>
        <CardSection title="Disney" />
      </div>
    </div>
  )
}
