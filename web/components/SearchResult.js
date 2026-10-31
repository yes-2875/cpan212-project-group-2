import styles from './SearchResult.module.css';
import Image from 'next/image';

export default function SearchResult({ data }) {
  if (!data) {
    return null;
  }
  
  console.log(data);
  return (
    <div className={styles.searchResult}>
      {/* Anime poster */}
      {data.imageUrl ? (
        <Image className={styles.coverImage}
          src={data.imageUrl}
          alt={`${data.title} cover image`}
          width={225} height={300}
        />
      ) : (
        <p>No poster available</p>
      )}

      {/* Anime information */}
      <div className={styles.textBlock}>
        <h2>{data.title}</h2>
        <p>{data.episodes ?? "Unknown"} episodes</p>
        <p>Year: {data.year ?? "Unknown"}</p>
        <p>Score: {data.score ?? "Not rated"}</p>
        <p className={`${styles.synopsis} muted`}>{(data.synopsis ?? "No description available") + '...'}</p>
        
        <div className={styles.buttons}>
          <button>Add to existing watchlist</button>
          <a className='button' href={`https://myanimelist.net/anime/${data.id}`} target='_blank'>View on MAL</a>
        </div>
      </div>

    </div>
  );
}