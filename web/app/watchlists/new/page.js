'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './page.module.css';

export default function NewWatchlistPage() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState([]);
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    setErrors({});
    setMessage({});
    setSubmitting(true);
    
    const form = new FormData(event.currentTarget);
    
    const newWatchlist = {
      name: form.get('name'),
      description: form.get('description'),
    };
    
    try {
      const response = await fetch('/api/watchlists', {
        method: 'POST',
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
      router.push('/watchlists/' + body._id);
      
    } catch(err) {
      setMessage('Could not reach the REST API. Check that it is running.');
      setSubmitting(false);
    }
    
    
  }
  
  return (
    <section className={styles.page}>
      {/* TODO: implement the watchlist creation page. */}
      <h1>New Watchlist</h1>
      <p>Please enter the following details to create a new watchlist.</p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        
        { message.length > 0 && <p className={styles.error}>{message}</p> }
        <div className={styles.field}>
          <label htmlFor='name'>Name*:</label>
          <input type='text' id='name' name='name'/>
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        
        <div className={styles.field}>
          <label htmlFor='description'>Description*:</label>
          <textarea id='description' name='description' rows={4} />
          {errors.description && <p className={styles.error}>{errors.description}</p>}
        </div>
        
        <button type='submit' disabled={submitting}>Create Watchlist</button>
      </form>
    </section>
  );
}