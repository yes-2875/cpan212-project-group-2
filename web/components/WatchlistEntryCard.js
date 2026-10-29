import Image from 'next/image';
import styles from './WatchlistEntryCard.module.css';

export default function WatchlistEntryCard({data}) {
  return (
    <div classname={styles.entryCard}>
      {/* TODO: create WatchlistEntryCard component for display inside a watchlist component */}
      <Image src={data.imageUrl} width={225} height={200} className={styles.image}/>
      <h3>{data.title}</h3>
      <p>{data.currentEpisode} out of {data.totalEpisodes} completed</p>
      <p>{data.status}</p>
    </div>
  );
}