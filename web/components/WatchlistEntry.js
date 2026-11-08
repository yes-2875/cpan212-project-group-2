'use client';

import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { useNotification } from "@/app/context/NotificationContext";
import Image from "next/image";
import styles from './WatchlistEntry.module.css';

export default function WatchlistEntry({data, status}) {
  if (!data) {
    notFound();
  }
  
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState([]);
  const {showNotification} = useNotification();
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    
    if (submitting) { return; }
    
    setErrors({});
    setMessage({});
    setSubmitting(true);
    
    const form = new FormData(event.currentTarget);
    
    const newWatchlistEntry = {
      watchlistId: data.watchlistId,
      malId: data.malId,
      title: data.title,
      imageUrl: data.imageUrl,
      totalEpisodes: data.totalEpisodes,
      currentEpisode: form.get('current-episode'),
      status: form.get('status'),
      score: data.score
    };
    
    try {
      const url = `/api/watchlist-entries/${status === 'editing' && data._id}`
      const response = await fetch(url, {
        method: (status === 'editing' ? 'PUT' : 'POST'),
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newWatchlistEntry)
      });
      
      const body = await response.json();
      
      if (!response.ok) {
        if (body.error.details) {
          setErrors(body.error.details);
        }
        setMessage(body.error.message);
        setSubmitting(false);
        return;
      }
      
      setSubmitting(false);
      showNotification('Watchlist entry successfully edited.');
      router.push('/watchlists/' + body.watchlistId);
      
    } catch(err) {
      setMessage('Could not reach the REST API. Check that it is running.');
      setSubmitting(false);
    }
    
    
  }
  
  return (
    <section className={styles.page}>
      <h1>{data.title}</h1>
      
      <div className={styles.flexRow}>
        <Image className={styles.image}
          src={data.imageUrl}
          alt={`${data.title} cover image`}
          width={225} height={300}
        />
        
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          
          { message.length > 0 && <p className={styles.error}>{message}</p> }
          <div className={styles.field}>
            <label htmlFor='name'>Name*:</label>
            <input type='text' id='name' name='name' defaultValue={data.name} />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
          
          <div className={styles.field}>
            <label htmlFor='description'>Description:</label>
            <textarea id='description' name='description' rows={4} defaultValue={data.description ?? ''} />
            {errors.description && <p className={styles.error}>{errors.description}</p>}
          </div>
          
          <button type='submit' disabled={submitting}>Save Entry</button>
        </form>
      </div>
    </section>
  );
}