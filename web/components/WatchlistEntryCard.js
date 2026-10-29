import Image from 'next/image';
import styles from './WatchlistEntryCard.module.css';

export default function WatchlistEntryCard({data}) {
  return (
    <div className={styles.entryCard}>
      {/* TODO: create WatchlistEntryCard component for display inside a watchlist component */}
      <Image src={data.imageUrl} width={225} height={300} alt='Cover image' className={styles.image}/>
      <h3>{data.title}</h3>
      <p>{data.currentEpisode} out of {data.totalEpisodes} completed</p>
      <p>{data.status}</p>
    </div>
  );
}