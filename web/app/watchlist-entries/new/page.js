import WatchlistEntry from "@/components/WatchlistEntry";
import Loading from "../(list)/loading";
import { Suspense } from "react";

export default async function NewWatchlistEntryPage({ searchParams }) {
  
  return (
    <Suspense fallback={<Loading />}>
      {searchParams.then(({data}) => (
        <WatchlistEntry data={JSON.parse(decodeURIComponent(data))} status='new' />
      ))}
    </Suspense>
  );
}