import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTrendingMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to load trending movies" />;
  }

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} location={location} />
    </div>
  );
};

export default HomePage;
