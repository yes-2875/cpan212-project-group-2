import WatchlistEntry from "@/components/WatchlistEntry";

export default function EditWatchlistEntryPage({ data }) {
  
  return (
    <section>
      <WatchlistEntry data={data} status='new' />
    </section>
  );
}