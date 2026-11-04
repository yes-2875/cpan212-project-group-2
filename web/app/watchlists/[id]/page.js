import { getWatchlistById } from '@/lib/api';
import Watchlist from '@/components/Watchlist';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Loading from '../(list)/loading';
import styles from '../page.module.css';

export default function WatchlistDetail({ params }) {
 
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