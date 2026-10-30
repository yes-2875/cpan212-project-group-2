'use client';
import { useEffect } from "react";
import styles from './page.module.css';

export default function WatchlistsError({error, retry}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  
  return (
    <section role='alert' className={styles.error}>
      <h1>Something went wrong.</h1>
      <p>The watchlists could not be loaded. Try again in a moment.</p>
      <button onClick={() => retry()}>Retry</button>
    </section>
  );
}