'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/app/context/NotificationContext";
import { watchlistIdOf } from "@/lib/api";
import { STATUSES } from "@/lib/list-options";
import Image from "next/image";
import Link from "next/link";
import styles from './WatchlistEntry.module.css';

// The fields this form has inputs for. Errors for any other field (malId, title, ...) are listed
// above the inputs, so a 400 from the API never fails silently.
const FORM_FIELDS = ['currentEpisode', 'status', 'score'];

// Form to add an anime to a watchlist (mode 'new') or edit an entry (mode 'editing').
// For 'new', data is the draft from the search page. For 'editing', it's the entry from the API,
// where watchlistId is populated (the whole watchlist object), so watchlistIdOf() reads the id.
// The page checks that data exists before rendering this form.
export default function WatchlistEntry({ data, mode }) {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const { showNotification } = useNotification();

  const editing = mode === 'editing';
  const watchlistId = watchlistIdOf(data);
  const totalEpisodes = Number(data.totalEpisodes) || 0;

  // "" stays "" so the API answers "currentEpisode is required" instead of silently saving 0.
  const numberOrEmpty = (value) => (value === '' || value === null ? '' : Number(value));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) { return; }

    setErrors({});
    setMessage('');
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const changes = {
      currentEpisode: numberOrEmpty(form.get('currentEpisode')),
      status: form.get('status'),
      score: numberOrEmpty(form.get('score')),
    };

    // A new entry sends everything. An edit sends only the fields the form can change.
    const body = editing ? changes : {
      watchlistId,
      malId: data.malId,
      title: data.title,
      imageUrl: data.imageUrl ?? '',
      totalEpisodes,
      ...changes,
    };

    try {
      const response = await fetch(editing ? `/api/watchlist-entries/${data._id}` : '/api/watchlist-entries', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        // 400: field errors from the Mongoose schema. 409: already in this watchlist. 404: entry was deleted.
        setErrors(result.error?.details ?? {});
        setMessage(result.error?.message ?? `Request failed (${response.status})`);
        setSubmitting(false);
        return;
      }

      showNotification(editing ? 'Watchlist entry successfully edited.' : 'Successfully added item to watchlist.');
      // result.watchlistId is populated (an object), so read the id from it.
      router.push('/watchlists/' + watchlistIdOf(result));

    } catch (err) {
      setMessage('Could not reach the REST API. Check that it is running. ' + err.message);
      setSubmitting(false);
    }
  };

  // Field errors that have no input on this form, e.g. { malId: '...' } or { watchlistId: '...' }.
  const otherErrors = Object.entries(errors).filter(([field]) => !FORM_FIELDS.includes(field));

  return (
    <section className={styles.page}>
      <h1>{data.title}</h1>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {data.imageUrl ? (
          <Image className={styles.image}
            src={data.imageUrl}
            alt={`${data.title} cover image`}
            width={400} height={533}
          />
        ) : (
          <p className={styles.image}>No poster available</p>
        )}

        <div className={styles.flexColumn}>
          {message && <p className={styles.error}>{message}</p>}
          {otherErrors.length > 0 && (
            <ul className={styles.error}>
              {otherErrors.map(([field, text]) => (
                <li key={field}>{typeof text === 'string' ? text : `${field}: ${JSON.stringify(text)}`}</li>
              ))}
            </ul>
          )}

          <div className={styles.field}>
            <label htmlFor='currentEpisode'>
              <input type='number' id='currentEpisode' name='currentEpisode'
                min={0} max={totalEpisodes > 0 ? totalEpisodes : undefined} step={1}
                defaultValue={data.currentEpisode ?? 0} />
              {' '}out of {totalEpisodes > 0 ? totalEpisodes : '?'} episodes completed
            </label>
            {errors.currentEpisode && <p className={styles.error}>{errors.currentEpisode}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor='status'>Status: </label>
            <select className={styles.option} name='status' id='status' defaultValue={data.status ?? 'Plan to Watch'}>
              {STATUSES.map((item) => (<option key={item} value={item}>{item}</option>))}
            </select>
            {errors.status && <p className={styles.error}>{errors.status}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor='score'>
              Your score:{' '}
              <input type='number' id='score' name='score' min={0} max={10} step={0.5}
                defaultValue={data.score ?? 0} /> / 10
            </label>
            {errors.score && <p className={styles.error}>{errors.score}</p>}
          </div>

          <button type='submit' className='blue-button' disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Entry'}
          </button>
          <Link className='button delete' href={watchlistId ? `/watchlists/${watchlistId}` : '/watchlists'}>Cancel</Link>
        </div>
      </form>
    </section>
  );
}
