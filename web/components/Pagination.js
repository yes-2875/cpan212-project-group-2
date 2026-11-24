import Link from 'next/link';
import styles from './Pagination.module.css';

// Previous and Next links for a paginated list, plus "Page 2 of 4 (31 entries)".
// hrefFor(page) builds the link for a page and keeps the current filters and sort.
// At the first or last page the link becomes plain text, so there is nothing to click.
export default function Pagination({ page, totalPages, total, noun, hrefFor, label }) {
  if (total === 0) {
    return null;
  }

  const lastPage = Math.max(totalPages, 1);

  return (
    <nav className={styles.pagination} aria-label={label}>
      {page > 1 ? (
        // Math.min: from a hand-typed ?page=9 of 2, Previous goes to the last real page.
        <Link href={hrefFor(Math.min(page - 1, lastPage))}>Previous</Link>
      ) : (
        <span aria-disabled="true">Previous</span>
      )}

      <span>
        Page {page} of {lastPage} ({total} {noun})
      </span>

      {page < lastPage ? (
        <Link href={hrefFor(page + 1)}>Next</Link>
      ) : (
        <span aria-disabled="true">Next</span>
      )}
    </nav>
  );
}
