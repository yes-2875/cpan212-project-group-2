'use client';

import Image from 'next/image';
import styles from './WatchlistEntryCard.module.css';
import { useNotification } from '@/app/context/NotificationContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function WatchlistEntryCard({data}) {

  const router = useRouter();
  const [deleteText, setDeleteText] = useState('Delete');
  const { showNotification } = useNotification();

  async function handleDelete(clicks) {
    if (clicks === 1) {
      if (deleteText !== 'Double-click to confirm') {
        setDeleteText('Double-click to confirm');

        await new Promise(resolve => setTimeout(resolve, 2000));
        setDeleteText('Delete');
      }
    } else if (clicks === 2) {
      // Relative URL: in the browser, /api/... goes through the Next.js rewrite to the Express API.
      const response = await fetch(`/api/watchlist-entries/${data._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        showNotification(`Failed to delete watchlist entry: ${response.status} ${response.statusText}`);
        setDeleteText('Delete');
        return;
      }

      showNotification('Successfully removed watchlist entry');
      // Re-render the current page (same filters, sort and page) without the deleted entry.
      router.refresh();
    }
  }

  const total = data.totalEpisodes > 0 ? data.totalEpisodes : '?';

  return (
    <div className={styles.entryCard}>
      {data.imageUrl ? (
        <Image src={data.imageUrl} width={225} height={300} alt={`${data.title} cover image`} className={styles.image}/>
      ) : (
        <p className={styles.image}>No poster available</p>
      )}
      <h3>{data.title}</h3>
      <p>{data.currentEpisode} out of {total} episodes completed</p>
      <p>{data.status}</p>
      <p>Your score: {data.score > 0 ? `${data.score} / 10` : 'not rated'}</p>

      <a href={`https://myanimelist.net/anime/${data.malId}`} className='button' target='_blank' rel='noreferrer'>View on MAL</a>
      <button className='blue-button' onClick={() => router.push(`/watchlist-entries/${data._id}/edit`)}>Edit</button>
      <button className='delete' onClick={() => handleDelete(1)} onDoubleClick={() => handleDelete(2)}>{deleteText}</button>
    </div>
  );
}
