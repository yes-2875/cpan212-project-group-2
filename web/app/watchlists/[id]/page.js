import { getWatchlistById } from '@/lib/api';
import { notFound } from 'next/navigation';
import styles from '../page.module.css';

export default async function WatchlistDetail({ params }) {
  const routeParams = await params;
  const watchlist = await getWatchlistById(routeParams.id);
  
  if (!watchlist) {
    notFound();
  }
  
  /*
  TODO (Mirza): we need to grab the watchlist by ID from the REST API and display the
  Watchlist component with its data for greater detail on it. The Watchlist
  component will also show all of its entries as cards in very brief detail.
  */
  
  return (
    <section>
      <h1 className={styles.title}>Watchlist Name</h1>
      <h1>ID: {routeParams.id}</h1>
      <h2>Header2</h2>
      <h3>Header3</h3>
      <p>Paragraph Text</p>
    </section>
  );
}