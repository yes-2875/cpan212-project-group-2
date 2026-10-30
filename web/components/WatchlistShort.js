import styles from './WatchlistShort.module.css';
import { getWatchlistEntries } from '@/lib/api';
import Link from 'next/link';

export default async function WatchlistShort({data}) {
  const {_id, userId, name, description} = data;
  const entries = (await getWatchlistEntries()).filter((item) => item.watchlistId === _id);
  
  return (
    <Link className={styles.watchlistShort} href={`/watchlists/${_id}`}>
      <h2>{name}</h2>
      {description && <p>{description}</p>}
      <p className='muted'>{entries.length} items</p>
    </Link>
  );
}