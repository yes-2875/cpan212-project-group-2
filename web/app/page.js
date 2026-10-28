import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Title <div className={styles.highlight}>Highlight</div>
      </h1>
      <h1>Header1</h1>
      <h2>Header2</h2>
      <h3>Header3</h3>
      <p>Paragraph Text</p>
    </main>
  );
}
