import styles from "./banner.module.css";

interface Props {
  buttonText: string;
}

const Banner = (props: Props) => {
  const { buttonText } = props;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subTitle}>Discover your local coffee shops</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button}>{buttonText}</button>
      </div>
    </div>
  );
};

export default Banner;
