"use client";

import { useState } from "react";
import { searchAnime, getWatchlists } from "@/lib/api";
import { useNotification } from "../context/NotificationContext";
import SearchResult from "@/components/SearchResult";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [anime, setAnime] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [watchlists, setWatchlists] = useState([]);

    const { showNotification } = useNotification();

    const handleSearch = async () => {        
        if (!query.trim()) {
            showNotification("Please enter an anime name.");
            return;
        }

        setLoading(true);
        setSearched(false);
        setAnime([]);

        try {
            // The list endpoint is paginated, so ask for the largest page (50) to fill the "Add to" menu.
            const [watchlistResult, results] = await Promise.all([
                getWatchlists({ limit: 50, sort: 'name' }),
                searchAnime(query.trim()),
            ]);
        
            if (results === null) {
                showNotification("Something went wrong while searching.");
            } else {
                setAnime(results);
                setSearched(true);
                setWatchlists(watchlistResult.data ?? []);
                showNotification(`Found ${results.length} anime.`);
            }
        } catch (error) {
            showNotification(error.message || "Something went wrong while searching.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <h1>Search Anime</h1>
            <input
                type="text"
                placeholder="Enter anime name..."
                name='query'
                id='query'
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />

            <button onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "Search"}
            </button>

            {searched && anime.length === 0 && (
                <p>No results found.</p>
            )}
            
            {anime.map((item) => (
                <SearchResult key={item.id} data={item} watchlists={watchlists} />
            ))}
        </section>
    );
}