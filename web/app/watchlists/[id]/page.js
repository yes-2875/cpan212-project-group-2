import { getWatchlistById } from '@/lib/api';
import Watchlist from '@/components/Watchlist';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Loading from '../(list)/loading';
import styles from '../page.module.css';

export default function WatchlistDetail({ params }) {
  
  
  /*
  TODO (Mirza): we need to grab the watchlist by ID from the REST API and display the
  Watchlist component with its data for greater detail on it. The Watchlist
  component will also show all of its entries as cards in very brief detail.
  */
 
 return (
   <section>
      <Suspense fallback={<Loading/>}>
        {params.then(({id}) => (
          <Content id={id}/>
        ))}
      </Suspense>
    </section>
  );
}

async function Content({ id }) {
  const watchlist = await getWatchlistById(id);
  
  if (!watchlist) {
    notFound();
  }
  
  return (<Watchlist watchlist={watchlist} />);
}