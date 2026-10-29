import { getWatchlistById } from '@/lib/api';
import Watchlist from '@/components/Watchlist';
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
      <Watchlist watchlist={watchlist} />
    </section>
  );
}