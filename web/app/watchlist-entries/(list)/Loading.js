import styles from "../page.module.css";

export default function Loading() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Watchlist Entries</h1>
      <h1 style={{"fontWeight": "normal"}}>Loading watchlist entries..</h1>
    </main>
  );
}