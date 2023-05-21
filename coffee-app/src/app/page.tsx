import styles from "./styles.module.css";

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${styles.main}`}>
      <h1 className={styles.title}>Coffee App</h1>
    </main>
  )
}
