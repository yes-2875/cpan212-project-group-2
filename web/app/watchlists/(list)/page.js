import { getWatchlists } from "@/lib/api";
import { notFound } from "next/navigation";
import styles from "../page.module.css";

export default async function Watchlists() {
  const watchlists = await getWatchlists();
  
  if (!watchlists) {
    notFound();
  }
  
  /*
  TODO (Mirza): we need to grab the watchlists from the REST API and display
  a list of Watchlist components.
  */
  
  return (
    <section>
      <h1 className={styles.title}> Your Watchlists</h1>
      <h1>Header1</h1>
      <h2>Header2</h2>
      <h3>Header3</h3>
      <p>Paragraph Text</p>
    </section>
  );
}
