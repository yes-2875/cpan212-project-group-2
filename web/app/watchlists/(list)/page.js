import { getWatchlists } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import WatchlistShort from "@/components/WatchlistShort";
import styles from "../page.module.css";

export default async function Watchlists() {
  const watchlists = await getWatchlists();
  
  if (!watchlists) {
    notFound();
  }
  
  return (
    <section>
      <h1 className={styles.title}> Your Watchlists</h1>
      {watchlists.length > 0 ?
        <div className={styles.watchlists}>
          {watchlists.map( (item) => <WatchlistShort key={item._id} data={item} /> )}
        </div>
      : <h3>You have no watchlists. Use the button below to create one.</h3>}
      
      <Link className={styles.createButton} href='/watchlists/new'>Create new watchlist</Link>
      
    </section>
  );
}
