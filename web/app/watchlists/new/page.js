import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './page.module.css';

export default function NewWatchlistPage() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState([]);
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    setErrors({});
    setMessage({});
    
    const form = new FormData(event.currentTarget);
    
    // TODO: gather the required fields and create form data to submit
    // as a POST request to the REST API. List any errors that show up
    // for the respective fields on submit.
    
    const newWatchlist = {};
    
    try {
      const response = await fetch('/api/watchlists', {
        method: 'POST',
        headers: {'Content-Type:': 'application/json'},
        body: JSON.stringify(newWatchlist)
      });
      
      const body = await response.json();
      
      if (!response.ok) {
        if (body.error.details) {
          setErrors(body.error.details);
        }
        setMessage(body.error.message);
        return;
      }
      
    } catch(err) {
      setMessage('Could not reach the API. Check that it is running.');
    }
  }
  
  return (
    <section className={styles.page}>
      {/* TODO: implement the watchlist creation page. */}
      
    </section>
  );
}