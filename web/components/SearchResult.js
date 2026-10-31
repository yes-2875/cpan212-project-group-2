export default function SearchResult({ data }) {
  if (!data) {
    return null;
  }

  return (
    <div className="search-result">

      {/* Anime poster */}
      {data.imageUrl ? (
        <img
          src={data.imageUrl}
          alt={data.title}
          width="150"
        />
      ) : (
        <p>No poster available</p>
      )}

      {/* Anime information */}
      <div>
        <h2>{data.title}</h2>

        <p>Episodes: {data.episodes ?? "Unknown"}</p>

        <p>Year: {data.year ?? "Unknown"}</p>

        <p>Score: {data.score ?? "Not rated"}</p>

        <p>{data.synopsis || "No description available."}</p>
      </div>

    </div>
  );
}