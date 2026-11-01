'use client';

import styles from './SearchResult.module.css';
import { useNotification } from '@/app/context/NotificationContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function SearchResult({ data, watchlists }) {
  if (!data) {
    return null;
  }

  const { showNotification } = useNotification();
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

  const addEntry = async (event) => {
    const { value } = event.target;

    if (value === '' || !value) {
      return;
    } else {

      setAdding(true);

      const entry = {
        watchlistId: value,
        malId: data.id,
        title: data.title,
        imageUrl: data.imageUrl,
        totalEpisodes: data.episodes,
        currentEpisode: 1,
        status: 'Plan to Watch',
        score: data.score
      };

      console.log(`Adding result to watchlist ID ${value}`);

      const response = await fetch(`${BASE_URL}/api/watchlist-entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });

      const body = await response.json();

      if (!response.ok) {
        let message = 'Failed to add to watchlist: ' + body.error.message + ':';
        if (body.error.details) {
          for (const prop in body.error.details) {
            message += ` ${prop}: ${body.error.details[prop]},`;
          }
        }

        message = message.slice(0, message.length - 1);

        showNotification(message);
        setAdding(false);
        return;
      }

      showNotification('Successfully added item to watchlist.');
      setAdding(false);
      router.push(`/watchlists/${value}`);
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
          <a className='button' href={`https://myanimelist.net/anime/${data.id}`} target='_blank'>View on MAL</a>
        </div>
      </div>

    </div>
  );
}