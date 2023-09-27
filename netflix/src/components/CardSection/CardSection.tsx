import styles from "./CardSection.module.css";
import Card from "@/components/Card/Card";

interface Props {
  title: string;
}

const CardSection = (props: Props) => {
  const { title } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        <Card imgUrl="/static/clifford.webp" size="large" />
      </div>
    </section>
  );
};

export default CardSection;
