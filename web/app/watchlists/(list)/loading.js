import styles from "../page.module.css";

export default function Loading() {
  return (
    <section>
      <h1 className={styles.title}>Your Watchlists</h1>
      <h2 style={{"fontWeight": "normal"}}>Loading watchlists...</h2>
    </section>
  );
}
