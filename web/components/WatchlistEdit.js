'use client';

import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { useNotification } from "@/app/context/NotificationContext";
import styles from './WatchlistEdit.module.css';

export default function WatchlistEdit({data}) {
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
    
    const newWatchlist = {
      name: form.get('name'),
      description: form.get('description'),
    };
    
    try {
      const response = await fetch('/api/watchlists/' + data._id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newWatchlist)
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
      showNotification('Watchlist successfully edited.');
      router.push('/watchlists/' + body._id);
      
    } catch(err) {
      setMessage('Could not reach the REST API. Check that it is running.');
      setSubmitting(false);
    }
    
    
  }
  
  return (
    <section className={styles.page}>
      <h1>Edit Watchlist {data.name}</h1>
      <p>Enter the following details to edit this watchlist.</p>
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
        
        <button type='submit' disabled={submitting}>Save Watchlist</button>
      </form>
    </section>
  );
}