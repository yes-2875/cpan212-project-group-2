'use client';
import styles from './WatchlistShort.module.css';
import Link from 'next/link';
import { useNotification } from '@/app/context/NotificationContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function WatchlistShort({data, entryCount = 0}) {
  
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
      // The API also deletes the watchlist's entries.
      const response = await fetch(`/api/watchlists/${data._id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        showNotification(`Failed to delete watchlist: ${response.status} ${response.statusText}`);
        setDeleteText('Delete');
        return;
      }
      
      showNotification('Successfully removed watchlist');
      router.refresh();
    }
  }
  
  const {_id, name, description} = data;
  
  return (
    <div className={styles.watchlistShort}>
      <Link href={`/watchlists/${_id}`}>
        <h2>{name}</h2>
        {description && <p>{description}</p>}
        <p className='muted'>{entryCount} {entryCount === 1 ? 'entry' : 'entries'}</p>
        <p style={{textAlign: 'center'}}>Click to view more/edit</p>
      </Link>
      <button className='delete' onClick={() => handleDelete(1)} onDoubleClick={() => handleDelete(2)}>{deleteText}</button>
    </div>
  );
}