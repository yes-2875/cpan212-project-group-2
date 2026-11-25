import { getWatchlistEntries } from "@/lib/api";
import Form from "next/form";
import Link from "next/link";
import WatchlistEntryCard from "./WatchlistEntryCard";
import Pagination from "./Pagination";
import {
  ENTRY_SORT_OPTIONS,
  MAX_SEARCH_LENGTH,
  PAGE_SIZES,
  STATUSES,
  watchlistHref,
} from "@/lib/list-options";
import styles from './Watchlist.module.css';

// One watchlist and a page of its entries.
// options comes from readEntryListOptions (lib/list-options.js), so every value is already safe:
// { status, q, sort, page, limit }.
export default async function Watchlist({ watchlist, options }) {
  const { status, q, sort, limit } = options;

  const result = await getWatchlistEntries({ watchlistId: watchlist._id, ...options });
  const { data: entries, page, total, totalPages } = result;

  // Links keep the current filters, sort and page size, and change only the page.
  const hrefFor = (nextPage) => watchlistHref(watchlist._id, { status, q, sort, limit, page: nextPage });
  const filtered = Boolean(status || q);

  return (
    <div className={styles.watchlist}>
      <h1>{watchlist.name}</h1>
      {watchlist.description && <p className={styles.description}>{watchlist.description}</p>}

      {/* A GET form: submitting it loads this page with ?q=...&status=...&sort=...&limit=...
          It has no page field, so changing a filter starts at page 1.
          key: a new key rebuilds the form when the URL changes, so the inputs show the current values. */}
      <Form
        key={`${status}|${q}|${sort}|${limit}`}
        className={styles.listControls}
        action={`/watchlists/${watchlist._id}`}
      >
        <label>
          Search titles
          <input type="search" name="q" placeholder="Anime title" defaultValue={q} maxLength={MAX_SEARCH_LENGTH} />
        </label>

        <label>
          Status
          <select name="status" defaultValue={status}>
            <option value="">All statuses</option>
            {STATUSES.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          Sort by
          <select name="sort" defaultValue={sort}>
            {ENTRY_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Items per page
          <select name="limit" defaultValue={String(limit)}>
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </label>

        <button type="submit">Apply</button>
        <Link href={`/watchlists/${watchlist._id}`}>Clear</Link>
      </Form>

      {entries.length > 0 ? (
        <div className={styles.entryCards}>
          {entries.map((entry) => (
            <WatchlistEntryCard data={entry} key={entry._id} />
          ))}
        </div>
      ) : (
        <div className={styles.noCards}>
          {total > 0 ? (
            // A hand-typed ?page=9 when there are only 2 pages.
            <h3>
              There are no entries on page {page}. Go back to the <Link href={hrefFor(1)}>first page</Link>.
            </h3>
          ) : filtered ? (
            <h3>No anime entries match these filters.</h3>
          ) : (
            <>
              <h3>This watchlist is empty.</h3>
              <Link href='/search' className='button'>Search Anime</Link>
            </>
          )}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        noun={total === 1 ? 'entry' : 'entries'}
        hrefFor={hrefFor}
        label="Anime entry pages"
      />

      <Link href={`/watchlists/${watchlist._id}/edit`} className='button'>Edit Watchlist</Link>
    </div>
  );
}
