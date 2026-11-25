import styles from "../page.module.css";

export default function Loading() {
  return (
    <section>
      <h1 className={styles.title}>Watchlist Entries</h1>
      <h2 style={{"fontWeight": "normal"}}>Loading watchlist entries...</h2>
    </section>
  );
}