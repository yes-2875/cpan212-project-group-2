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
      // Figure out how to post the DELETE request for this watchlist entry and refresh the watchlists page
      const response = await fetch(`${process.env.BASE_URL ?? 'http://localhost:3000'}/api/watchlist-entries/${data._id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        showNotification(`Failed to delete watchlist entry: ${response.status} ${response.statusText}`);
        setDeleteText('Delete');
        return;
      }
      
      showNotification('Successfully removed watchlist entry');
      router.push('/watchlists/' + data.watchlistId);
    }
  }
  
  return (
    <div className={styles.entryCard}>
      <Image src={data.imageUrl} width={225} height={300} alt='Cover image' className={styles.image}/>
      <h3>{data.title}</h3>
      <p>{data.currentEpisode} out of {data.totalEpisodes} completed</p>
      <p>{data.status}</p>
      
      <a href={`https://myanimelist.net/anime/${data.malId}`} className='button' target='_blank'>View on MAL</a>
      <button className='delete' onClick={() => handleDelete(1)} onDoubleClick={() => handleDelete(2)}>{deleteText}</button>
    </div>
  );
}