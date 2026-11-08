import Loading from "../../(list)/loading";
import { Suspense } from "react";
import { getWatchlistEntryById } from "@/lib/api";
import WatchlistEntry from "@/components/WatchlistEntry";

export default async function EditWatchlistEntryPage({ params }) {
  
  return (
    <section>
      <Suspense fallback={<Loading />}>
        {params.then(({id}) => getWatchlistEntryById(id).then((data) => (
          <WatchlistEntry data={data} status='editing' />
        )))}
      </Suspense>
    </section>
  );
}