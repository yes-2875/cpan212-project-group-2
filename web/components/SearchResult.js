'use client';

import styles from './SearchResult.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function SearchResult({ data, watchlists }) {
  // Hooks must run on every render, so they come before the early return.
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  if (!data) {
    return null;
  }

  const addEntry = async (event) => {
    const { value } = event.target;

    if (value === '' || !value) {
      return;
    } else {

      setAdding(true);
      
      // A draft for the new-entry form. episodes is null for a show that's still airing,
      // and 0 means "unknown" in the API. score is left out: it's the user's own score, set on the form.
      const entry = {
        watchlistId: value,
        malId: data.id,
        title: data.title,
        imageUrl: data.imageUrl ?? '',
        totalEpisodes: data.episodes ?? 0,
      };

      const query = new URLSearchParams({ data: JSON.stringify(entry) });
      router.push(`/watchlist-entries/new?${query}`);
      setAdding(false);
      
    }
  };

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
          {(watchlists && watchlists.length > 0) && (
            <select name='watchlistId' id='watchlistId' className='button' onChange={addEntry} disabled={adding}>
              <option value='' className={styles.option}>Add to existing watchlist</option>
              {watchlists.map((item) => <option key={item._id} value={item._id} className={styles.option}>{item.name}</option>)}
            </select>
          )}
          <a className='button' href={`https://myanimelist.net/anime/${data.id}`} target='_blank' rel='noreferrer'>View on MAL</a>
        </div>
      </div>

    </div>
  );
}