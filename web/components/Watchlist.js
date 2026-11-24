import { getWatchlistEntries } from "@/lib/api";
import WatchlistEntryCard from "./WatchlistEntryCard";
import Link from "next/link";
import styles from './Watchlist.module.css';

export default async function Watchlist({watchlist, searchParams = {}}) {
  const params = await searchParams;
  const status = typeof params.status === 'string' ? params.status : '';
  const q = typeof params.q === 'string' ? params.q : '';
  const sort = typeof params.sort === 'string' ? params.sort : 'title';
  const page = typeof params.page === 'string' ? params.page : '1';
  const limit = typeof params.limit === 'string' ? params.limit : '10';
  
  const result = await getWatchlistEntries({
    watchlistId: watchlist._id, status, q, sort, page, limit,
  });

  const entries = result.data ?? [];
  const totalPages = Math.max(result.totalPages, 1);

  function pageUrl(nextPage) {
    const query = new URLSearchParams();
    if (status) query.set('status', status);
    if (q) query.set('q', q);
    if (sort) query.set('sort', sort);
    if (limit) query.set('limit', limit);

    query.set('page', String(nextPage));
    
    return `/watchlists/${watchlist._id}?${query.toString()}`;
  }

  return (
    <div className={styles.watchlist}>
      <h1>{watchlist.name}</h1>
      {watchlist.description && <p className={styles.description}>{watchlist.description}</p>}

      <form className={styles.listControls} action={`/watchlists/${watchlist._id}`} method="GET">
        <label>
          Search titles
          <input type="search" name="q" placeholder="Anime title" defaultValue={q}/>
        </label>

        <label>
          Status
          <select name="status" defaultValue={status}>
            <option value="">All statuses</option>
            <option value="Watching">Watching</option>
            <option value="Completed">Completed</option>
            <option value="Plan to Watch">Plan to Watch</option>
            <option value="On Hold">On Hold</option>
            <option value="Dropped">Dropped</option>
          </select>
        </label>

        <label>
          Sort by
          <select name="sort" defaultValue={sort}>
            <option value="title">Title (A-Z)</option>
            <option value="-title">Title (Z-A)</option>
            <option value="score">Score (lowest first)</option>
            <option value="-score">Score (highest first)</option>
            <option value="currentEpisode">Current episode (lowest first)</option>
            <option value="-currentEpisode">Current episode (highest first)</option>
            <option value="totalEpisodes">Total episodes (lowest first)</option>
            <option value="-totalEpisodes">Total episodes (highest first)</option>
          </select>
        </label>

        <label>
          Items per page
          <select name="limit" defaultValue={limit}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </label>

        <button type="submit">Apply</button>
        <Link href={`/watchlists/${watchlist._id}`}>Clear</Link>
      </form>
      
    {entries.length > 0 ? (
      <div className={styles.entryCards}>
        {entries.map((entry) => (
          <WatchlistEntryCard data={entry} key={entry._id}/>
        ))}
      </div> ) : (
        <div className={styles.noCards}>
          <h3> {result.total === 0 ? 'No anime entries match these filters.' : 'There are no entries on this page.'} </h3>
        <Link href='/search' className='button'>Search Anime</Link>
      </div>
    )}

    {result.total > 0 && (
      <nav className={styles.pagination} aria-label="Anime entry pages">
        {result.page > 1 ? (
          <Link href={pageUrl(result.page - 1)}>Previous</Link>
        ) : (
          <span aria-disabled="true">Previous</span>
        )}

        <span>Page {result.page} of {totalPages}({result.total} entries)</span>

        {result.page < result.totalPages ? (
          <Link hreaf={pageUrl(result.page + 1)}>Next</Link>
        ) : (
          <span aria-disabled="true">Next</span>
        )}
      </nav>
    )}
      
      <Link href={`/watchlists/${watchlist._id}/edit`} className='button'>Edit Watchlist</Link>
    </div>
  );
}