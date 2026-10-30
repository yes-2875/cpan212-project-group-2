import { getWatchlists } from "@/lib/api";
import { notFound } from "next/navigation";
import WatchlistShort from "@/components/WatchlistShort";
import styles from "../page.module.css";

export default async function Watchlists() {
  const watchlists = await getWatchlists();
  
  if (!watchlists) {
    notFound();
  }
  
  /*watchlists.map((item) => {
    console.log('Item:', item);
    console.log('Item._id:', item._id);
  })*/
  /*
  TODO (Mirza): we need to grab the watchlists from the REST API and display
  a list of Watchlist components.
  */
  
  return (
    <section>
      <h1 className={styles.title}> Your Watchlists</h1>
      <div className={styles.watchlists}>
        {watchlists.map( (item) => <WatchlistShort key={item._id} data={item} /> )}
      </div>
    </section>
  );
}
