import NavBar from "@/components/NavBar/NavBar";
import Banner from "@/components/Banner/Banner";
import Card from "@/components/Card/Card";

export default function Home() {
  return (
    <div>
      <NavBar username="me@rommelrico.com" />
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />
      <Card imgUrl="/static/clifford.webp" size="large" />
      <Card size="medium" />
      <Card imgUrl="/static/clifford.webp" size="small" />
    </div>
  )
}
