import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../movies-api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId)
      .then((results) => {
        setAllReviews(results);
      })
      .catch((error) => console.error("error:" + error));
  }, [movieId]);

  return allReviews.length > 0 ? (
    <ul className={css.list}>
      {allReviews.map((review) => (
        <li key={review.id} className={css.item}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>We do not have any reviews for this movie.</p>
  );
}
