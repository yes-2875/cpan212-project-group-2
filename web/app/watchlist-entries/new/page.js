import WatchlistEntry from "@/components/WatchlistEntry";
import Loading from "../(list)/loading";
import { Suspense } from "react";
import { notFound } from "next/navigation";

// The search page sends the new entry as JSON in ?data=...
// searchParams values are already decoded, so this only needs JSON.parse.
// Returns null for a missing, repeated or broken value instead of crashing the page.
function readDraft(raw) {
  if (typeof raw !== 'string') {
    return null;
  }
  try {
    const draft = JSON.parse(raw);
    return draft && typeof draft === 'object' && draft.watchlistId && draft.title ? draft : null;
  } catch {
    return null;
  }
}

async function NewEntryForm({ searchParams }) {
  const { data } = await searchParams;
  const draft = readDraft(data);

  if (!draft) {
    notFound();
  }

  return <WatchlistEntry data={draft} mode='new' />;
}

export default function NewWatchlistEntryPage({ searchParams }) {
  return (
    <Suspense fallback={<Loading />}>
      <NewEntryForm searchParams={searchParams} />
    </Suspense>
  );
}
