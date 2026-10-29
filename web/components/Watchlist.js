import { getWatchlistEntries } from "@/lib/api";
import WatchlistEntryCard from "./WatchlistEntryCard";
import styles from './Watchlist.module.css';

export default async function Watchlist({watchlist}) {
  const entries = (await getWatchlistEntries()).filter((entry) => entry.watchlistId === watchlist._id);
  return (
    <div className={styles.watchlist}>
      {/* TODO: create Watchlist component to display inside /watchlists/ */}
      <h1>{watchlist.name}</h1>
      {watchlist.description && <p className={styles.description}>{watchlist.description}</p>}
      
      <div className={styles.entryCards}>
        {entries.map((entry) => (
          <WatchlistEntryCard data={entry} key={entry._id}/>
        ))}
      </div>
    </div>
  );
}