'use client';

import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { useNotification } from "@/app/context/NotificationContext";
import Image from "next/image";
import Link from "next/link";
import styles from './WatchlistEntry.module.css';

export default function WatchlistEntry({data, status}) {
  if (!data) {
    notFound();
  }
  const statuses = [
    'Watching',
    'Completed',
    'Plan to Watch',
    'On Hold',
    'Dropped'
  ];
  
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
      currentEpisode: Number(form.get('current-episode')),
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
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Image className={styles.image}
          src={data.imageUrl}
          alt={`${data.title} cover image`}
          width={400} height={533}
        />
        
        <div className={styles.flexColumn}>
          { message.length > 0 && <p className={styles.error}>{message}</p> }
          <div className={styles.field}>
            <label htmlFor='current-episode'>
              <input type='number' id='current-episode' name='current-episode'
              min={0} max={data.totalEpisodes} placeholder={0} defaultValue={0}/> out of {data.totalEpisodes} episodes completed
            </label>
            
            {errors.currentEpisode && <p className={styles.error}>{errors.currentEpisode}</p>}
          </div>
          
          <div className={styles.field}>
            <label htmlFor='status'>Status: </label>
            <select className={styles.option} name='status' id='status'>
              {statuses.map((item) => (<option key={item} value={item}>{item}</option>))}
            </select>
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
          
          <button type='submit' className='blue-button' disabled={submitting}>Save Entry</button>
          <Link className='button delete' href={`/watchlists/${data.watchlistId}`}>Cancel</Link>
        </div>
      </form>
    </section>
  );
}