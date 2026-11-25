import Loading from "../../(list)/loading";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getWatchlistEntryById } from "@/lib/api";
import WatchlistEntry from "@/components/WatchlistEntry";

async function EditEntryForm({ params }) {
  const { id } = await params;
  const entry = await getWatchlistEntryById(id);

  // A badly formed id and a deleted entry both come back as 404 (null).
  if (!entry) {
    notFound();
  }

  return <WatchlistEntry data={entry} mode='editing' />;
}

export default function EditWatchlistEntryPage({ params }) {
  return (
    <section>
      <Suspense fallback={<Loading />}>
        <EditEntryForm params={params} />
      </Suspense>
    </section>
  );
}
