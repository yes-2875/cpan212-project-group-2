import styles from './page.module.css';

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <h1>404</h1>
      <p>The requested resource could not be found.</p>
      
    </section>
  );
}