import styles from "../page.module.css";

export default function Loading() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Your Watchlists</h1>
      <h1 style={{"fontWeight": "normal"}}>Loading watchlists..</h1>
    </main>
  );
}
