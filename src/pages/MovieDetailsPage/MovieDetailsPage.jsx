import { useEffect, useState } from "react";
import {
  useParams,
  Link,
  useNavigate,
  useLocation,
  Route,
  Routes,
} from "react-router-dom";
import { getMovieDetails } from "../../movies-api";

import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const previousPage = location.state?.from || "/movies";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to load movie details" />;
  }

  if (!movie) {
    return null;
  }

  const handleGoBack = () => {
    navigate(previousPage);
  };

  return (
    <div className={css.container}>
      <button onClick={handleGoBack}>Go back</button>
      <div className={css.movieDetails}>
        <img
          className={css.moviePoster}
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={css.movieInfo}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>
        </div>
      </div>
      <div className={css.additionalInfo}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ from: previousPage }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: previousPage }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
};

export default MovieDetailsPage;
