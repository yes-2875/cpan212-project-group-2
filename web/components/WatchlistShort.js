import styles from './WatchlistShort.module.css';
import { getWatchlistEntries } from '@/lib/api';
import Link from 'next/link';

export default async function WatchlistShort({data}) {
  const {_id, userId, name, description} = data;
  const entries = (await getWatchlistEntries()).filter((item) => item.watchlistId === _id);
  
  return (
    <div className={styles.watchlistShort}>
      <Link href={`/watchlists/${_id}`}>
        <h2>{name}</h2>
        {description && <p>{description}</p>}
        <p className='muted'>{entries.length} items</p>
        <p style={{textAlign: 'center'}}>Click to view more</p>
      </Link>
      <button className={styles.delete}>Delete</button>
    </div>
  );
}