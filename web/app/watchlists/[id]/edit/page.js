import Loading from "../../(list)/loading";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getWatchlistById } from "@/lib/api";
import WatchlistEdit from "@/components/WatchlistEdit";

async function EditWatchlistForm({ params }) {
  const { id } = await params;
  const watchlist = await getWatchlistById(id);

  // A badly formed id and a deleted watchlist both come back as 404 (null).
  if (!watchlist) {
    notFound();
  }

  return <WatchlistEdit data={watchlist} />;
}

export default function EditWatchlistPage({ params }) {
  return (
    <section>
      <Suspense fallback={<Loading />}>
        <EditWatchlistForm params={params} />
      </Suspense>
    </section>
  );
}
