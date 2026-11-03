import Loading from "../../(list)/loading";
import { Suspense } from "react";
import { getWatchlistById } from "@/lib/api";
import WatchlistEdit from "@/components/WatchlistEdit";

export default async function EditWatchlistPage({ params }) {
  
  return (
    <section>
      <Suspense fallback={<Loading />}>
        {params.then(({id}) => getWatchlistById(id).then((data) => (
          <WatchlistEdit data={data} />
        )))}
      </Suspense>
    </section>
  );
}