import NavBar from "@/components/NavBar/NavBar";
import Banner from "@/components/Banner/Banner";
import Card from "@/components/Card/Card";

export default function Home() {
  return (
    <div>
      <h1>Netflix</h1>
      <NavBar username="me@rommelrico.com" />
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />
      <Card />
    </div>
  )
}
