import { getWatchlists } from "@/lib/api.js";
import Form from "next/form";
import Link from "next/link";
import WatchlistShort from "@/components/WatchlistShort";
import Pagination from "@/components/Pagination";
import {
  MAX_SEARCH_LENGTH,
  PAGE_SIZES,
  WATCHLIST_SORT_OPTIONS,
  readWatchlistListOptions,
  watchlistsHref,
} from "@/lib/list-options";
import styles from "../page.module.css";

export const metadata = {
  title: 'Your watchlists',
};

// The search, sort, page and page size all live in the URL (/watchlists?q=fav&sort=-name&page=2),
// so reloading, bookmarking or sharing the URL shows the same view.
export default async function Watchlists({ searchParams }) {
  // In Next.js 16 searchParams is a promise. readWatchlistListOptions turns it into safe values.
  const options = readWatchlistListOptions(await searchParams);
  const { q, sort, limit } = options;

  const result = await getWatchlists(options);
  const { data: watchlists, page, total, totalPages } = result;

  // Links keep the current search, sort and page size, and change only the page.
  const hrefFor = (nextPage) => watchlistsHref({ q, sort, limit, page: nextPage });

  return (
    <section>
      <h1 className={styles.title}>Your Watchlists</h1>

      {/* A GET form: submitting it loads /watchlists?q=...&sort=...&limit=..., the same as clicking a link.
          It has no page field, so a new search or sort starts at page 1.
          key: defaultValue only sets the starting value, so a new key makes React rebuild the form
          when the URL changes (e.g. after Clear), instead of keeping the old text in the inputs. */}
      <form key={`${q}|${sort}|${limit}`} className={styles.listControls} action="/watchlists">
        <label className={styles.controlField}>
          Search watchlists
          <input
            type="search"
            name="q"
            placeholder="Name or description"
            defaultValue={q}
            maxLength={MAX_SEARCH_LENGTH}
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
          <select name="limit" defaultValue={String(limit)}>
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </label>

        <button type="submit">Apply</button>
        <Link href="/watchlists" className="button">Clear</Link>
      </form>

      {watchlists.length > 0 ? (
        <div className={styles.watchlists}>
          {watchlists.map((watchlist) => (
            <WatchlistShort
              key={watchlist._id}
              data={watchlist}
              entryCount={watchlist.entryCount}
            />
          ))}
        </div>
      ) : total > 0 ? (
        // A hand-typed ?page=9 when there are only 2 pages.
        <h3>
          There are no watchlists on page {page}. Go back to the{' '}
          <Link href={hrefFor(1)}>first page</Link>.
        </h3>
      ) : q ? (
        <h3>No watchlists match &quot;{q}&quot;.</h3>
      ) : (
        <h3>You have no watchlists. Use the button below to create one.</h3>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        noun={total === 1 ? 'watchlist' : 'watchlists'}
        hrefFor={hrefFor}
        label="Watchlist pages"
      />

      <Link className={styles.createButton} href='/watchlists/new'>Create new watchlist</Link>
    </section>
  );
}
