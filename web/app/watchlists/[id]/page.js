import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getWatchlistById } from '@/lib/api';
import { readEntryListOptions } from '@/lib/list-options';
import Watchlist from '@/components/Watchlist';

// Reads the id and the list options from the URL, loads the watchlist, and renders it.
// It's a separate component so the page can show a fallback (below) while it loads.
async function WatchlistDetail({ params, searchParams }) {
  const { id } = await params;
  const options = readEntryListOptions(await searchParams);
  const watchlist = await getWatchlistById(id);

  if (!watchlist) {
    notFound();
  }

  return <Watchlist watchlist={watchlist} options={options} />;
}

// With cacheComponents on, reading params, searchParams or the API has to happen inside <Suspense>.
export default function WatchlistDetailPage({ params, searchParams }) {
  return (
    <section>
      <Suspense fallback={<h2 style={{ fontWeight: 'normal' }}>Loading watchlist...</h2>}>
        <WatchlistDetail params={params} searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
