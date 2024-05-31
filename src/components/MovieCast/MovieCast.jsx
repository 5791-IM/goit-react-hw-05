import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../movies-api";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [credits, setCredits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovieCredits(movieId)
      .then((results) => {
        setCredits(results.cast);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error fetching movie credits:", error);
      });
  }, [movieId]);

  if (error) {
    return <p className={css.error}>Error: {error}</p>;
  }

  if (credits.length === 0) {
    return <p className={css.message}>No cast information available.</p>;
  }

  return (
    <ul className={css.list}>
      {credits.map((credit) => (
        <li key={credit.id} className={css.item}>
          {credit.profile_path ? (
            <img
              width="150px"
              height="225px"
              src={`https://image.tmdb.org/t/p/original/${credit.profile_path}`}
              alt={credit.name}
            />
          ) : (
            <img
              width="150px"
              height="225px"
              src="https://axiomplus.com.ua/pub/media/review/default_avatar.svg"
              alt={credit.name}
            />
          )}
          <h3>{credit.name}</h3>
          <p>{credit.character}</p>
        </li>
      ))}
    </ul>
  );
}
