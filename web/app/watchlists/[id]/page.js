import { getWatchlistById } from '@/lib/api';
import Watchlist from '@/components/Watchlist';
import { notFound } from 'next/navigation';

export default async function WatchlistDetail({ params, searchParams }) {
  const {id} = await params;
  const query = await searchParams;
  const watchlist = await getWatchlistById(id);
  
  if (!watchlist) {
    notFound();
  }
  
  return (
    <section>
      <Watchlist watchlist={watchlist} searchParams={query}/>
    </section>
  );
}