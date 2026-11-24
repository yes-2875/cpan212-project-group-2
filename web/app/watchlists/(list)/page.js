import { getWatchlistEntries, getWatchlists } from "@/lib/api.js";
import { notFound } from "next/navigation";
import Link from "next/link";
import WatchlistShort from "@/components/WatchlistShort";
import styles from "../page.module.css";

function valueOf(value, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function makePageUrl({q, sort, limit}, page) {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (sort) params.set('sort', sort);
  if (limit) params.set('limit', String(limit));
  params.set('page', String(page));
  return `/watchlists?${params.toString()}`;
}

export default async function Watchlists({searchParams}) {
  const params = await searchParams;
  const q = valueOf(params?.q);
  const sort = valueOf(params?.sort, 'name');
  const page = valueOf(params?.page, '1');
  const limit = valueOf(params?.limit, '10');

  const result = await getWatchlists({q, sort, page, limit});
  
  if (!result || !Array.isArray(result.data)) {
    notFound();
  }
  
  const watchlists = result.data;
  const totalPages = Math.max(result.totalPages, 1);

  const watchlistsWithCounts = await Promise.all(
    watchlists.map(async (watchlist) => {
      const entryResult = await getWatchlistEntries({
        watchlistId: watchlist._id,
        page: 1,
        limit: 1,
      });

      return {
        watchlist,
        entryCount: entryResult.total,
      }
    })
  )

  return (
    <section>
      <h1 className={styles.title}> Your Watchlists</h1>

      <form className={styles.listControls} action="/watchlists" method="GET">
        <label className={styles.controlField}>
          Search Watchlists
          <input
            type="search"
            name="q"
            placeholder="Name or description"
            defaultValue={q}
          />
        </label>

        <label className={styles.controlField}>
          Sort by
          <select name="sort" defaultValue={sort}>
            <option value="name">Name (A-Z)</option>
            <option value="-name">Name (Z-A)</option>
            <option value="created">Oldest first</option>
            <option value="-created">Newest first</option>
          </select>
        </label>

        <label className={styles.controlField}>
          Items per page
          <select name ="limit" defaultValue={limit}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </label>

        <button type="submit">Apply</button>
        <Link href="/watchlists" className="button">Clear</Link>
      </form>

      {watchlistsWithCounts.length > 0 ? (
        <div className={styles.watchlists}>
          {watchlistsWithCounts.map(({watchlist, entryCount}) => (
            <WatchlistShort
              key={watchlist._id}
              data={watchlist}
              entryCount={entryCount}
            />
          ))}
        </div>
      ) : ( <h3> {q ? 'No watchlists match your search.' : 'You have no watchlists. Use the button below to create one.'} </h3> )}
      
      {result.total > 0 && (
        <nav className={styles.pagination} aria-label="Watchlist pages">
          {result.page > 1 ? (
            <Link href={makePageUrl({q, sort, limit}, result.page - 1)}>
              Previous
            </Link>
          ) : (
            <span aria-disabled="true">Previous</span>
          )}
          <span>Page {result.page} of {totalPages} ({result.total} watchlists)</span>

          {result.page < result.totalPages ? (
            <Link href={makePageUrl({q, sort, limit}, result.page + 1)}>
              Next
            </Link>
          ) : (
            <span aria-disabled="true">Next</span>
          )}
        </nav>
      )}

      <Link className={styles.createButton} href='/watchlists/new'>Create new watchlist</Link>
      
    </section>
  );
}
