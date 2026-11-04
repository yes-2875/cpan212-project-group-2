import { getWatchlistEntries } from "@/lib/api";
import WatchlistEntryCard from "./WatchlistEntryCard";
import Link from "next/link";
import styles from './Watchlist.module.css';

export default async function Watchlist({watchlist}) {
  const entries = (await getWatchlistEntries()).filter((entry) => entry.watchlistId === watchlist._id);
  return (
    <div className={styles.watchlist}>
      <h1>{watchlist.name}</h1>
      {watchlist.description && <p className={styles.description}>{watchlist.description}</p>}
      
      {entries.length > 0 ?
      <div className={styles.entryCards}>
        {entries.map((entry) => ( <WatchlistEntryCard data={entry} key={entry._id}/> ))}
      </div> :
      
      <div className={styles.noCards}>
        <h3>It's very empty in here. Mind finding some animes to add to your watchlist?</h3>
        <Link href='/search' className='button'>Search Anime</Link>
      </div>}
      
      <Link href={`/watchlists/${watchlist._id}/edit`} className='button'>Edit Watchlist</Link>
    </div>
  );
}