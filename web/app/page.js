import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <section className={styles.intro}>
      <h1>
        Welcome to the <div className={styles.highlight}>only</div> anime list app you actually need.
      </h1>
      <h3>Want to start browsing?</h3>
      <Link className='button' href='/watchlists'>Browse Watchlists</Link>
      <br></br>
      <h3>Or find an anime to add to your watchlist?</h3>
      <Link className='button' href='/search'>Search Anime</Link>
    </section>
  );
}
